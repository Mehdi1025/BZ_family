import { cn } from "@/lib/utils";

interface OverprintProps {
  children: string;
  /** Variante posée sur un aplat outremer (l'encre du dessous passe en jaune) */
  onBlue?: boolean;
  /** Repérage déjà calé au chargement */
  registered?: boolean;
  className?: string;
}

/**
 * SIGNATURE — défaut de repérage.
 * Le mot est imprimé deux fois : encre fluo décalée dessous, encre principale
 * dessus. C'est l'accident d'impression des affiches sérigraphiées de quartier.
 * Le repérage se cale au survol.
 */
export function Overprint({
  children,
  onBlue = false,
  registered = false,
  className,
}: OverprintProps) {
  return (
    <span
      className={cn(
        "overprint",
        onBlue && "overprint--onblue",
        registered && "is-registered",
        className
      )}
    >
      <span className="overprint-under" aria-hidden="true">
        {children}
      </span>
      <span className="relative">{children}</span>
    </span>
  );
}
