import * as React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string; // string from API
  size?: number | string;
  color?: string;
  className?: string;
  fallback?: string; // optional fallback icon name
}

// Utility: "user-check" → "UserCheck"
function toPascalCase(str: string) {
  return str
    .split(/[-_ ]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 18,
  color = "currentColor",
  className,
  fallback = "CircleHelp",
  ...props
}) => {
  const pascalName = toPascalCase(name);

  // Cast only the lookup result, not the entire module
  const LucideIcon =
    ((LucideIcons as unknown) as Record<string, React.ComponentType<any>>)[pascalName] ||
    ((LucideIcons as unknown) as Record<string, React.ComponentType<any>>)[fallback];

  if (!LucideIcon) return null;

  return <LucideIcon size={size} color={color} className={className} {...props} />;
};
