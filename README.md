# 🏪 POS-2025 - Sistema de Punto de Venta Integral

<div align="center">

![POS-2025 Logo](https://img.shields.io/badge/POS-2025-blue?style=for-the-badge&logo=cash-register)

**Sistema de Punto de Venta moderno, integral y multicanal para restaurantes y comercios en Colombia**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 🎯 **Descripción del Proyecto**

POS-2025 es un sistema integral de punto de venta diseñado específicamente para el mercado colombiano. Combina tecnologías web modernas para ofrecer una experiencia fluida tanto en dispositivos de escritorio como móviles, con enfoque especial en restaurantes y comercios que requieren gestión avanzada de pedidos, inventario y múltiples canales de venta.

### 🌟 **Características Principales**

- **💳 Punto de Venta Completo**: Interfaz táctil intuitiva para ventas rápidas y eficientes
- **📱 Aplicación Móvil**: PWA optimizada para tablets y dispositivos móviles
- **🍽️ Gestión de Restaurantes**: Sistema completo de mesas, comandas y cocina
- **📦 Control de Inventario**: Gestión avanzada de productos, stock y proveedores
- **👥 Gestión de Usuarios**: Sistema de roles y permisos granulares
- **📊 Reportes y Analíticas**: Dashboard ejecutivo con métricas en tiempo real
- **🚚 Integración Delivery**: Conexión con Rappi, Uber Eats y Didi Food
- **💰 Múltiples Métodos de Pago**: Efectivo, tarjetas, QR (PSE, Nequi, Daviplata)
- **🧾 Facturación Electrónica**: Cumplimiento normativo DIAN Colombia

---

## 🚀 **Inicio Rápido**

### **Prerrequisitos**

- Node.js 18+ 
- npm o yarn
- Cuenta de Firebase
- Git

### **Instalación**

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/POS-2025.git
   cd POS-2025
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` con tus credenciales de Firebase:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
   # ... más configuraciones
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

---

## 🛠️ **Stack Tecnológico**

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes**: shadcn/ui
- **Estado**: React Context API
- **Formularios**: React Hook Form + Zod

### **Backend**
- **Base de Datos**: Firebase Firestore
- **Autenticación**: Firebase Auth
- **Storage**: Firebase Storage
- **Hosting**: Vercel / Firebase Hosting

### **Herramientas de Desarrollo**
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions
- **Monitoreo**: Firebase Analytics

---

## 📁 **Estructura del Proyecto**

```
POS-2025/
├── 📁 src/
│   ├── 📁 app/                    # App Router (Next.js 14)
│   │   ├── 📁 dashboard/          # Panel principal
│   │   │   ├── 📁 pos/           # Módulo POS
│   │   │   ├── 📁 inventory/     # Gestión de inventario
│   │   │   ├── 📁 reports/       # Reportes y analíticas
│   │   │   ├── 📁 settings/      # Configuraciones
│   │   │   └── 📁 whatsapp/      # Integración WhatsApp
│   │   ├── 📁 login/             # Autenticación
│   │   └── layout.tsx            # Layout principal
│   ├── 📁 components/             # Componentes reutilizables
│   │   ├── 📁 ui/                # Componentes UI base
│   │   └── user-nav.tsx          # Navegación de usuario
│   ├── 📁 context/               # Contextos de React
│   ├── 📁 firebase/              # Configuración Firebase
│   ├── 📁 lib/                   # Utilidades y helpers
│   └── 📁 services/              # Servicios y APIs
├── 📁 docs/                      # Documentación
├── 📁 public/                    # Archivos estáticos
├── 📄 package.json               # Dependencias
├── 📄 tailwind.config.ts         # Configuración Tailwind
├── 📄 tsconfig.json              # Configuración TypeScript
└── 📄 README.md                  # Este archivo
```

---

## 👥 **Roles de Usuario**

El sistema maneja diferentes roles con permisos específicos:

| Rol | Permisos | Descripción |
|-----|----------|-------------|
| **👑 Administrador** | Acceso completo | Gestión total del sistema |
| **🍽️ Mesero** | Pedidos, mesas | Toma de pedidos y gestión de mesas |
| **💰 Vendedor** | POS, ventas | Operación del punto de venta |
| **🍹 Bartender** | Bebidas, bar | Gestión de bebidas y bar |
| **🧾 Cajero** | Cobros, caja | Manejo de pagos y caja |

---

## 📊 **Estado del Proyecto**

### **✅ Funcionalidades Implementadas (35%)**

- ✅ Sistema de autenticación y usuarios
- ✅ Gestión de roles y permisos
- ✅ POS básico para ventas
- ✅ Gestión básica de inventario
- ✅ Dashboard con reportes básicos
- ✅ Integración con WhatsApp

### **🔄 En Desarrollo**

- 🔄 Gestión de mesas para restaurantes
- 🔄 Sistema de comandas (KDS)
- 🔄 Aplicación móvil (PWA)
- 🔄 Múltiples métodos de pago

### **⏳ Planificado**

- ⏳ Integración con APIs de delivery (Rappi, Uber Eats, Didi Food)
- ⏳ Facturación electrónica DIAN
- ⏳ Reportes avanzados y analíticas
- ⏳ Sistema de fidelización de clientes

---

## 🎯 **Casos de Uso**

### **🍽️ Restaurantes**
- Gestión completa de mesas y reservas
- Toma de pedidos desde tablets
- Sistema de comandas para cocina
- Control de tiempos de preparación

### **☕ Cafeterías**
- POS rápido para ventas express
- Control de inventario de productos perecederos
- Gestión de promociones y descuentos

### **🛍️ Tiendas de Retail**
- Ventas con múltiples métodos de pago
- Control de stock en tiempo real
- Gestión de proveedores

### **🏢 Franquicias**
- Gestión multi-sucursal centralizada
- Reportes consolidados
- Control de inventario distribuido

---

## 🇨🇴 **Enfoque Colombia**

POS-2025 está diseñado específicamente para el mercado colombiano:

- **💳 Métodos de Pago Locales**: Nequi, Daviplata, PSE
- **🚚 Delivery Platforms**: Rappi, Uber Eats, Didi Food
- **🧾 Normatividad**: Cumplimiento DIAN para facturación electrónica
- **💰 Moneda**: Soporte nativo para pesos colombianos (COP)
- **📱 UX Local**: Interfaz adaptada a preferencias locales

---

## 🚀 **Roadmap 2025**

### **Q1 2025 - Funcionalidades Core**
- [ ] Sistema completo de gestión de mesas
- [ ] Aplicación móvil (PWA) para meseros
- [ ] Sistema de comandas (Kitchen Display System)
- [ ] Múltiples métodos de pago

### **Q2 2025 - Integraciones**
- [ ] API de Rappi
- [ ] API de Uber Eats
- [ ] API de Didi Food
- [ ] Facturación electrónica DIAN

### **Q3 2025 - Analíticas Avanzadas**
- [ ] Dashboard ejecutivo avanzado
- [ ] Reportes predictivos
- [ ] Sistema de fidelización
- [ ] App móvil nativa

### **Q4 2025 - Escalabilidad**
- [ ] Multi-sucursal
- [ ] API pública
- [ ] Integraciones contables
- [ ] Marketplace de plugins

---

## 🤝 **Contribuciones**

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### **Guías de Contribución**

- Sigue las convenciones de código existentes
- Escribe tests para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario
- Usa commits descriptivos con emojis

---

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 **Soporte y Contacto**

- **📧 Email**: soporte@pos2025.com
- **💬 Discord**: [Servidor POS-2025](https://discord.gg/pos2025)
- **📱 WhatsApp**: +57 300 123 4567
- **🐛 Issues**: [GitHub Issues](https://github.com/tu-usuario/POS-2025/issues)

---

## 🙏 **Agradecimientos**

- **Next.js Team** por el excelente framework
- **Firebase Team** por la plataforma backend
- **shadcn** por los componentes UI
- **Vercel** por el hosting y deployment
- **Comunidad Open Source** por las librerías utilizadas

---

<div align="center">

**⭐ Si este proyecto te es útil, considera darle una estrella ⭐**

**Hecho con ❤️ para la comunidad colombiana**

</div>

