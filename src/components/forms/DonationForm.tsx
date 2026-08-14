"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [10, 25, 50, 100] as const;

const donationSchema = z.object({
  amount: z.number().min(1, "Montant minimum : 1€"),
  donorName: z.string().min(2, "Nom requis"),
  donorEmail: z.string().email("Email invalide"),
});

type DonationFormData = z.infer<typeof donationSchema>;

export function DonationForm() {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: { amount: 25 },
  });

  function selectPreset(amount: number) {
    setSelectedPreset(amount);
    setCustomAmount("");
    setValue("amount", amount);
  }

  function handleCustomChange(value: string) {
    setCustomAmount(value);
    setSelectedPreset(null);
    const num = parseFloat(value);
    if (!isNaN(num)) setValue("amount", num);
  }

  async function onSubmit(data: DonationFormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(data.amount * 100),
          donorName: data.donorName,
          donorEmail: data.donorEmail,
        }),
      });
      const { url } = await res.json();
      if (url) window.location.assign(url);
      else throw new Error("Pas d'URL Stripe");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <Label className="mb-4 block text-base">Choisissez un montant</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => selectPreset(amount)}
              className={cn(
                "rounded-xl border-2 py-4 text-lg font-bold transition-all",
                selectedPreset === amount
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              {amount}€
            </button>
          ))}
        </div>
        <div className="mt-4">
          <Label htmlFor="customAmount">Montant libre (€)</Label>
          <Input
            id="customAmount"
            type="number"
            min="1"
            step="1"
            placeholder="Autre montant"
            value={customAmount}
            onChange={(e) => handleCustomChange(e.target.value)}
            className="mt-2"
          />
        </div>
        {errors.amount && (
          <p className="mt-2 text-sm text-destructive">{errors.amount.message}</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="donorName">Nom</Label>
          <Input id="donorName" {...register("donorName")} />
          {errors.donorName && (
            <p className="text-sm text-destructive">{errors.donorName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="donorEmail">Email</Label>
          <Input id="donorEmail" type="email" {...register("donorEmail")} />
          {errors.donorEmail && (
            <p className="text-sm text-destructive">{errors.donorEmail.message}</p>
          )}
        </div>
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          Impossible de lancer le paiement. Vérifiez la configuration Stripe.
        </p>
      )}

      <Button type="submit" variant="accent" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        Faire un don sécurisé
      </Button>
    </form>
  );
}
