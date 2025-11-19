export interface TemplateConfig {
  colors: Record<string, string>
}

export function getTemplateConfig(theme: string): TemplateConfig {
  const themes: Record<string, TemplateConfig> = {
    default: {
      colors: {
        primary: "#8B4513",
        secondary: "#D2691E",
        accent: "#DEB887",
      },
    },
    modern: {
      colors: {
        primary: "#2C3E50",
        secondary: "#3498DB",
        accent: "#ECF0F1",
      },
    },
    eco: {
      colors: {
        primary: "#27AE60",
        secondary: "#2ECC71",
        accent: "#A8E6CF",
      },
    },
  }

  return themes[theme] || themes.default
}
