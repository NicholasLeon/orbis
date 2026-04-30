
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      keyframes: {
        logoFlux: {
          '0%, 100%': { 
            transform: 'scale(1)', 
            opacity: '0.6' 
          },
          '50%': { 
            transform: 'scale(0.92)', 
            opacity: '0.2' 
          },
        },
      },
      animation: {
        logoFlux: 'logoFlux 6s ease-in-out infinite',
        logoFluxDelayed: 'logoFlux 6s ease-in-out 3s infinite',
      },
    },
  },
};
export default config;