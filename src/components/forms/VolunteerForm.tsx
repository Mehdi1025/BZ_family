"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const volunteerSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Téléphone invalide"),
  availability: z.string().min(1, "Sélectionnez vos disponibilités"),
  skills: z.string().min(5, "Décrivez vos compétences"),
  motivation: z.string().min(20, "Motivation trop courte (min. 20 caractères)"),
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

export function VolunteerForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
  });

  async function onSubmit(data: VolunteerFormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input id="firstName" {...register("firstName")} />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input id="lastName" {...register("lastName")} />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" type="tel" {...register("phone")} />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="availability">Disponibilités</Label>
        <select
          id="availability"
          {...register("availability")}
          className="flex h-11 w-full rounded-xl border border-input bg-white px-4 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <option value="">Sélectionnez...</option>
          <option value="semaine">En semaine</option>
          <option value="weekend">Le week-end</option>
          <option value="soir">En soirée</option>
          <option value="flexible">Flexible</option>
        </select>
        {errors.availability && (
          <p className="text-sm text-destructive">{errors.availability.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Compétences</Label>
        <Textarea
          id="skills"
          placeholder="Ex: cuisine, informatique, animation..."
          {...register("skills")}
        />
        {errors.skills && (
          <p className="text-sm text-destructive">{errors.skills.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivation">Motivation</Label>
        <Textarea
          id="motivation"
          placeholder="Pourquoi souhaitez-vous rejoindre BZ Family ?"
          rows={4}
          {...register("motivation")}
        />
        {errors.motivation && (
          <p className="text-sm text-destructive">{errors.motivation.message}</p>
        )}
      </div>

      {status === "success" && (
        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
          Candidature envoyée ! Nous vous contacterons sous 48h.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          Une erreur est survenue. Veuillez réessayer.
        </p>
      )}

      <Button type="submit" disabled={status === "loading"} size="lg">
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        Envoyer ma candidature
      </Button>
    </form>
  );
}
