md
# Informe Técnico del Sistema: CommerceFlow

**Fecha:** 02 de octubre de 2025
**Versión:** 1.0

## 1. Resumen Ejecutivo

Este documento proporciona un análisis técnico exhaustivo de la arquitectura, tecnologías y componentes del sistema **CommerceFlow**. El propósito de este informe es servir como una guía de referencia para el equipo de desarrollo, facilitando el mantenimiento, la escalabilidad y la incorporación de nuevos miembros al proyecto.

La aplicación ha sido desarrollada como un sistema de punto de venta (POS) y gestión de restaurantes, con una arquitectura moderna basada en **Next.js** y un fuerte enfoque en la experiencia de usuario y la personalización.

---

## 2. Inventario de Tecnologías Principales

El stack tecnológico ha sido seleccionado para garantizar un desarrollo rápido, un alto rendimiento y una excelente mantenibilidad.

| Tecnología | Versión | Propósito en el Proyecto |
| :--- | :--- | :--- |
| **Next.js** | 15.3.3 | Framework principal de React para el desarrollo de la aplicación, utilizando el App Router para el enrutamiento y renderizado tanto en el servidor como en el cliente. |
| **React** | 18.3.1 | Biblioteca fundamental para la construcción de la interfaz de usuario a través de una arquitectura basada en componentes. |
| **TypeScript** | 5 | Lenguaje de programación principal. Aporta un sistema de tipos estático que mejora la robustez, la legibilidad y la detección temprana de errores. |
| **Tailwind CSS** | 3.4.1 | Framework de CSS "utility-first" para el diseño rápido y personalizado de la interfaz de usuario. Se complementa con `tailwindcss-animate`. |
| **ShadCN/UI** | N/A | Colección de componentes de UI reutilizables y accesibles, construidos sobre Radix UI y Tailwind CSS. Es la base de nuestro sistema de diseño. |
| **Lucide React** | 0.475.0 | Librería de iconos utilizada para toda la iconografía de la aplicación, proporcionando coherencia visual. |
| **Recharts** | 2.15.1 | Librería de gráficos utilizada en la sección de "Reportes" para visualizar datos de ventas, productos y rendimiento. |

---

## 3. Integraciones con Sistemas Externos y Servicios de Terceros

La aplicación extiende su funcionalidad a través de la integración con servicios especializados.

### **Genkit (Google AI)**
- **Tecnología:** `@genkit-ai/google-genai` (v1.20.0), `genkit`.
- **Propósito:** Es el motor de todas las funcionalidades de **Inteligencia Artificial** en la aplicación. Se utiliza para:
    - **Agente de Pedidos por WhatsApp:** Procesar lenguaje natural para tomar pedidos, verificar el stock y gestionar la conversación con el cliente (`whatsapp-order.ts`).
    - **Sugerencias de Inventario:** Analizar datos históricos y de contexto para recomendar cantidades de reposición de productos (`inventory-reorder-suggestions.ts`).
- **Arquitectura:** Los flujos de Genkit se definen en el backend (`'use server'`) y se invocan desde los componentes de React a través de Server Actions.

---

## 4. Funcionalidades y Gestión de Bases de Datos

Actualmente, el sistema utiliza un **mecanismo de simulación de base de datos** para la persistencia de datos, ideal para un entorno de desarrollo rápido y prototipado.

- **Sistema de Gestión:** Se utiliza un archivo `orders.json` ubicado en `src/services/` como base de datos persistente para los pedidos. Para los datos de productos y usuarios, se utilizan los archivos `src/lib/placeholder-data.ts` y `localStorage`, respectively.
- **Mecanismos de Conexión y Consulta:** La interacción con el archivo `orders.json` se gestiona a través del módulo `fs` de Node.js (`fs.readFileSync`, `fs.writeFileSync`), centralizado en el archivo `src/services/order-service.ts`.
- **Operaciones CRUD Implementadas:**
    - **Create:** La función `createOrder` gestiona la creación de nuevos pedidos, los procesa y los añade al archivo JSON.
    - **Read:** Las funciones `getOrders` y `getOrderStatus` se encargan de leer y devolver todos los pedidos o el estado de uno específico.
    - **Update:** Las funciones `updateOrderStatus` y `updateOrderItems` permiten modificar los pedidos existentes.
    - **Delete:** Aunque no hay una función de eliminación para los pedidos (para mantener el historial), la lógica de eliminación existe en la UI para productos e usuarios, modificando los arrays en memoria y `localStorage`.
- **Estrategias de Optimización y Seguridad:**
    - Dado el carácter de simulación del sistema de persistencia, no se han implementado estrategias avanzadas de optimización de consultas o seguridad a nivel de base de datos.
    - **Importante:** Para un entorno de producción, se recomienda migrar esta lógica a un sistema de base de datos robusto como **Firestore**, que ofrece escalabilidad, seguridad a través de reglas (`firestore.rules`) y capacidades de consulta en tiempo real.

---

## 5. Otras Tecnologías y Librerías Complementarias

- **Context API (React):** Utilizada para la gestión de estados globales de la aplicación, como la información del negocio (`BusinessContext`), los datos de usuario (`UserContext`) y el tema de la aplicación (`ThemeContext`).
- **Date-fns:** Librería para la manipulación y el formateo de fechas, utilizada principalmente en la sección de pedidos y reportes.
- **Zod:** Utilizada para la validación de esquemas de datos, especialmente en las entradas y salidas de los flujos de IA de Genkit, garantizando la integridad de los datos.
- **Clsx & Tailwind-merge:** Utilidades para la construcción de clases de CSS condicionales y la fusión inteligente de clases de Tailwind, mejorando la legibilidad del código de los componentes.
