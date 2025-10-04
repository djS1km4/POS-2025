# Exportación del Proyecto CommerceFlow

Este archivo contiene la totalidad del código del proyecto, organizado por archivo, para facilitar su extracción y configuración en un entorno de desarrollo local.

**Instrucciones:**
1. Crea un nuevo proyecto de Next.js en tu máquina local.
2. Ve archivo por archivo de la lista de abajo.
3. Crea el archivo correspondiente en tu proyecto local con la misma ruta.
4. Copia el contenido y pégalo en tu nuevo archivo.
5. Una vez que hayas copiado todos los archivos, ejecuta `npm install` en la terminal de tu proyecto local para instalar todas las dependencias.

---
---

### Archivo: `.env`

```

```

---
---

### Archivo: `README.md`

```md
# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

```

---
---

### Archivo: `apphosting.yaml`

```yaml
# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1

```

---
---

### Archivo: `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

---
---

### Archivo: `docs/backend.json`

```json
{
  "entities": {
    "Product": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Product",
      "type": "object",
      "description": "Represents a product available for sale.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the product."
        },
        "name": {
          "type": "string",
          "description": "Name of the product."
        },
        "description": {
          "type": "string",
          "description": "Detailed description of the product."
        },
        "sku": {
          "type": "string",
          "description": "Stock Keeping Unit, a unique identifier for inventory management."
        },
        "price": {
          "type": "number",
          "description": "Selling price of the product."
        },
        "imageUrl": {
          "type": "string",
          "description": "URL of the product image.",
          "format": "uri"
        },
        "categoryId": {
          "type": "string",
          "description": "Reference to Category. (Relationship: Category 1:N Product)"
        }
      },
      "required": [
        "id",
        "name",
        "sku",
        "price",
        "categoryId"
      ]
    },
    "Category": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Category",
      "type": "object",
      "description": "Represents a category of products.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the category."
        },
        "name": {
          "type": "string",
          "description": "Name of the category."
        },
        "description": {
          "type": "string",
          "description": "Description of the category."
        }
      },
      "required": [
        "id",
        "name"
      ]
    },
    "Inventory": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Inventory",
      "type": "object",
      "description": "Represents the inventory levels of a product.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the inventory record."
        },
        "productId": {
          "type": "string",
          "description": "Reference to Product. (Relationship: Product 1:1 Inventory)"
        },
        "quantity": {
          "type": "number",
          "description": "Current quantity of the product in stock."
        },
        "lowStockThreshold": {
          "type": "number",
          "description": "Threshold below which a low stock alert is triggered."
        }
      },
      "required": [
        "id",
        "productId",
        "quantity",
        "lowStockThreshold"
      ]
    },
    "Order": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Order",
      "type": "object",
      "description": "Represents a customer order.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the order."
        },
        "customerId": {
          "type": "string",
          "description": "Reference to Customer. (Relationship: Customer 1:N Order)"
        },
        "orderDate": {
          "type": "string",
          "description": "Date and time the order was placed.",
          "format": "date-time"
        },
        "totalAmount": {
          "type": "number",
          "description": "Total amount of the order."
        },
        "status": {
          "type": "string",
          "description": "Current status of the order (e.g., pending, processing, completed, cancelled)."
        }
      },
      "required": [
        "id",
        "customerId",
        "orderDate",
        "totalAmount",
        "status"
      ]
    },
    "OrderItem": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "OrderItem",
      "type": "object",
      "description": "Represents an item within an order.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the order item."
        },
        "orderId": {
          "type": "string",
          "description": "Reference to Order. (Relationship: Order 1:N OrderItem)"
        },
        "productId": {
          "type": "string",
          "description": "Reference to Product. (Relationship: Product 1:N OrderItem)"
        },
        "quantity": {
          "type": "number",
          "description": "Quantity of the product in the order item."
        },
        "unitPrice": {
          "type": "number",
          "description": "Price of one unit of the product at the time of the order."
        }
      },
      "required": [
        "id",
        "orderId",
        "productId",
        "quantity",
        "unitPrice"
      ]
    },
    "Customer": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Customer",
      "type": "object",
      "description": "Represents a customer.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the customer."
        },
        "firstName": {
          "type": "string",
          "description": "First name of the customer."
        },
        "lastName": {
          "type": "string",
          "description": "Last name of the customer."
        },
        "email": {
          "type": "string",
          "description": "Email address of the customer.",
          "format": "email"
        },
        "phoneNumber": {
          "type": "string",
          "description": "Phone number of the customer."
        }
      },
      "required": [
        "id",
        "firstName",
        "lastName",
        "email"
      ]
    },
    "SalesReport": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "SalesReport",
      "type": "object",
      "description": "Represents a sales report.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the sales report."
        },
        "reportDate": {
          "type": "string",
          "description": "Date the report was generated.",
          "format": "date-time"
        },
        "periodStartDate": {
          "type": "string",
          "description": "Start date of the reporting period.",
          "format": "date-time"
        },
        "periodEndDate": {
          "type": "string",
          "description": "End date of the reporting period.",
          "format": "date-time"
        },
        "totalSales": {
          "type": "number",
          "description": "Total sales amount for the period."
        }
      },
      "required": [
        "id",
        "reportDate",
        "periodStartDate",
        "periodEndDate",
        "totalSales"
      ]
    },
    "User": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "User",
      "type": "object",
      "description": "Represents a user of the system. This entity is intended to store non-authentication related user data. Authentication data should be handled by a dedicated auth system.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the user."
        },
        "username": {
          "type": "string",
          "description": "Username of the user."
        },
        "firstName": {
          "type": "string",
          "description": "First name of the user."
        },
        "lastName": {
          "type": "string",
          "description": "Last name of the user."
        },
        "roleId": {
          "type": "string",
          "description": "Reference to UserRole. (Relationship: UserRole 1:N User)"
        }
      },
      "required": [
        "id",
        "username",
        "firstName",
        "lastName",
        "roleId"
      ]
    },
    "UserRole": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "UserRole",
      "type": "object",
      "description": "Represents a user role and its associated permissions.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the user role."
        },
        "name": {
          "type": "string",
          "description": "Name of the user role (e.g., Administrator, Vendor)."
        },
        "permissions": {
          "type": "array",
          "description": "List of permissions granted to this role.",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "id",
        "name",
        "permissions"
      ]
    },
    "RestaurantTable": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "RestaurantTable",
      "type": "object",
      "description": "Represents a table in a restaurant.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the restaurant table."
        },
        "tableNumber": {
          "type": "string",
          "description": "Table number or identifier."
        },
        "capacity": {
          "type": "number",
          "description": "Number of seats at the table."
        },
        "status": {
          "type": "string",
          "description": "Current status of the table (e.g., available, occupied, reserved)."
        }
      },
      "required": [
        "id",
        "tableNumber",
        "capacity",
        "status"
      ]
    },
    "IntelligentSuggestion": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "IntelligentSuggestion",
      "type": "object",
      "description": "Represents a suggestion for reordering inventory based on AI analysis.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the suggestion."
        },
        "productId": {
          "type": "string",
          "description": "Reference to Product. (Relationship: Product 1:N IntelligentSuggestion)"
        },
        "suggestedQuantity": {
          "type": "number",
          "description": "Suggested quantity to reorder."
        },
        "reason": {
          "type": "string",
          "description": "Reasoning behind the suggestion (e.g., sales trend, seasonality)."
        },
        "suggestionDate": {
          "type": "string",
          "description": "Date the suggestion was generated.",
          "format": "date-time"
        }
      },
      "required": [
        "id",
        "productId",
        "suggestedQuantity",
        "reason",
        "suggestionDate"
      ]
    }
  },
  "auth": {
    "providers": [
      "password",
      "anonymous"
    ]
  },
  "firestore": {
    "structure": [
      {
        "path": "/products/{productId}",
        "definition": {
          "entityName": "Product",
          "schema": {
            "$ref": "#/backend/entities/Product"
          },
          "description": "Stores product information.",
          "params": [
            {
              "name": "productId",
              "description": "Unique identifier for the product."
            }
          ]
        }
      },
      {
        "path": "/categories/{categoryId}",
        "definition": {
          "entityName": "Category",
          "schema": {
            "$ref": "#/backend/entities/Category"
          },
          "description": "Stores product categories.",
          "params": [
            {
              "name": "categoryId",
              "description": "Unique identifier for the category."
            }
          ]
        }
      },
      {
        "path": "/inventories/{inventoryId}",
        "definition": {
          "entityName": "Inventory",
          "schema": {
            "$ref": "#/backend/entities/Inventory"
          },
          "description": "Stores inventory levels for each product.",
          "params": [
            {
              "name": "inventoryId",
              "description": "Unique identifier for the inventory record."
            }
          ]
        }
      },
      {
        "path": "/users/{userId}",
        "definition": {
          "entityName": "User",
          "schema": {
            "$ref": "#/backend/entities/User"
          },
          "description": "Stores user profiles and related data.",
          "params": [
            {
              "name": "userId",
              "description": "Unique identifier for the user."
            }
          ]
        }
      },
      {
        "path": "/orders/{orderId}",
        "definition": {
          "entityName": "Order",
          "schema": {
            "$ref": "#/backend/entities/Order"
          },
          "description": "Stores order information. Each order is linked to a customer.",
          "params": [
            {
              "name": "orderId",
              "description": "Unique identifier for the order."
            }
          ]
        }
      },
      {
        "path": "/order_items/{orderItemId}",
        "definition": {
          "entityName": "OrderItem",
          "schema": {
            "$ref": "#/backend/entities/OrderItem"
          },
          "description": "Stores individual items within an order.",
          "params": [
            {
              "name": "orderItemId",
              "description": "Unique identifier for the order item."
            }
          ]
        }
      },
      {
        "path": "/customers/{customerId}",
        "definition": {
          "entityName": "Customer",
          "schema": {
            "$ref": "#/backend/entities/Customer"
          },
          "description": "Stores customer information.",
          "params": [
            {
              "name": "customerId",
              "description": "Unique identifier for the customer."
            }
          ]
        }
      },
      {
        "path": "/sales_reports/{salesReportId}",
        "definition": {
          "entityName": "SalesReport",
          "schema": {
            "$ref": "#/backend/entities/SalesReport"
          },
          "description": "Stores sales reports.",
          "params": [
            {
              "name": "salesReportId",
              "description": "Unique identifier for the sales report."
            }
          ]
        }
      },
      {
        "path": "/restaurant_tables/{tableId}",
        "definition": {
          "entityName": "RestaurantTable",
          "schema": {
            "$ref": "#/backend/entities/RestaurantTable"
          },
          "description": "Stores restaurant table information.",
          "params": [
            {
              "name": "tableId",
              "description": "Unique identifier for the restaurant table."
            }
          ]
        }
      },
      {
        "path": "/intelligent_suggestions/{suggestionId}",
        "definition": {
          "entityName": "IntelligentSuggestion",
          "schema": {
            "$ref": "#/backend/entities/IntelligentSuggestion"
          },
          "description": "Stores intelligent suggestions for inventory reordering.",
          "params": [
            {
              "name": "suggestionId",
              "description": "Unique identifier for the suggestion."
            }
          ]
        }
      },
      {
        "path": "/roles_admin/{userId}",
        "definition": {
          "entityName": "UserRole",
          "schema": {
            "$ref": "#/backend/entities/UserRole"
          },
          "description": "Documents in this collection indicate administrative privileges. Existence of a document signifies admin role.",
          "params": [
            {
              "name": "userId",
              "description": "User ID of the administrator."
            }
          ]
        }
      }
    ],
    "reasoning": "The Firestore structure is designed to support the CommerceFlow application's core features, including POS interface, inventory management, order management, delivery platform integration, sales reporting, intelligent suggestions, and user role management. It prioritizes authorization independence, clarity, and security, avoiding hierarchical authorization dependencies. All collections are designed with homogeneous security postures.\n\n*   **Authorization Independence**: Achieved through denormalization. For instance, User roles could be stored directly within User documents if the roles are simple, or in a dedicated subcollection if the role structure is complex. Collaborative data, if needed, uses a `members` map.\n*   **QAPs (Rules are not Filters)**: Segregation is used extensively to support secure `list` operations. Private user data is stored under `/users/{userId}`, while global data like `/products` are stored separately. Role-based access is managed via existence checks in dedicated collections like `/roles_admin/{uid}`.\n\n*   `/products`: Stores product information. Categories are referenced by `categoryId`.\n*   `/categories`: Stores product categories.\n*   `/inventories`: Stores inventory levels for each product.\n*   `/users/{userId}`: Stores user profiles and related data.\n*   `/orders/{orderId}`: Stores order information. Each order is linked to a customer.\n*   `/order_items/{orderItemId}`: Stores individual items within an order.\n*   `/customers/{customerId}`: Stores customer information.\n*   `/sales_reports/{salesReportId}`: Stores sales reports.\n*   `/restaurant_tables/{tableId}`: Stores restaurant table information.\n*   `/intelligent_suggestions/{suggestionId}`: Stores intelligent suggestions for inventory reordering.\n*   `/roles_admin/{userId}`: Documents in this collection indicate administrative privileges. Existence of a document signifies admin role.\n\nThis structure allows for efficient querying, easy maintenance, and scalable security rules, adhering to the core design principles."
  }
}
```

---
---

### Archivo: `docs/technical-report.md`

```md
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
```

---
---

### Archivo: `next.config.ts`

```ts
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

---
---

### Archivo: `package.json`

```json
{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "NODE_ENV=production next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@genkit-ai/google-genai": "^1.20.0",
    "@genkit-ai/next": "^1.20.0",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^11.9.1",
    "genkit": "^1.20.0",
    "lucide-react": "^0.475.0",
    "next": "15.3.3",
    "patch-package": "^8.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "genkit-cli": "^1.20.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

---
---

### Archivo: `src/ai/dev.ts`

```ts
'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/inventory-reorder-suggestions.ts';
import '@/ai/flows/whatsapp-order.ts';
```

---
---

### Archivo: `src/ai/flows/inventory-reorder-suggestions.ts`

```ts
'use server';

/**
 * @fileOverview An AI agent to suggest optimal inventory reorder quantities.
 *
 * - suggestReorderQuantities - A function that suggests reorder quantities based on sales data.
 * - InventoryReorderInput - The input type for the suggestReorderQuantities function.
 * - InventoryReorderOutput - The return type for the suggestReorderQuantities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InventoryReorderInputSchema = z.object({
  salesHistory: z
    .string()
    .describe('Sales history data, including product, date, quantity.'),
  currentStock: z.string().describe('The current stock level of each product.'),
  seasonality: z.string().describe('Information about seasonal trends affecting sales.'),
  promotions: z.string().describe('Details of any ongoing or planned promotions.'),
});
export type InventoryReorderInput = z.infer<typeof InventoryReorderInputSchema>;

const InventoryReorderOutputSchema = z.object({
  reorderSuggestions: z
    .string()
    .describe(
      'Suggested reorder quantities for each product, taking into account sales history, current stock, seasonality and promotions.'
    ),
  rationale: z
    .string()
    .describe('A brief explanation of the factors influencing the reorder suggestions.'),
});
export type InventoryReorderOutput = z.infer<typeof InventoryReorderOutputSchema>;

export async function suggestReorderQuantities(
  input: InventoryReorderInput
): Promise<InventoryReorderOutput> {
  return inventoryReorderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'inventoryReorderPrompt',
  input: {schema: InventoryReorderInputSchema},
  output: {schema: InventoryReorderOutputSchema},
  prompt: `You are an experienced inventory manager. Analyze the provided data and suggest optimal reorder quantities for each product.

Consider the following factors:
- Sales History: {{{salesHistory}}}
- Current Stock: {{{currentStock}}}
- Seasonality: {{{seasonality}}}
- Promotions: {{{promotions}}}

Provide specific reorder quantities and a brief rationale for your suggestions.`,
});

const inventoryReorderFlow = ai.defineFlow(
  {
    name: 'inventoryReorderFlow',
    inputSchema: InventoryReorderInputSchema,
    outputSchema: InventoryReorderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
```

---
---

### Archivo: `src/ai/flows/whatsapp-order.ts`

```ts
'use server';
/**
 * @fileOverview An AI agent to process WhatsApp orders.
 *
 * - whatsAppOrder - A function that handles the WhatsApp order process.
 * - WhatsAppOrderInput - The input type for the whatsAppOrder function.
 * - WhatsAppOrderOutput - The return type for the whatsAppOrder function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { createOrder, getOrderStatus, OrderItem } from '@/services/order-service';

const createOrderTool = ai.defineTool(
  {
    name: 'createOrder',
    description: 'Use this to create a new order once all details (items, name, phone, address) are collected and confirmed by the customer. Returns the new order ID.',
    inputSchema: z.object({
      customerName: z.string(),
      customerPhone: z.string(),
      customerAddress: z.string(),
      items: z.array(z.object({
        productId: z.string(),
        quantity: z.number(),
        notes: z.string().optional(),
      })),
    }),
    outputSchema: z.string(),
  },
  async (input) => createOrder(input)
);

const getOrderStatusTool = ai.defineTool(
  {
    name: 'getOrderStatus',
    description: 'Check the status of an existing order using the order ID.',
    inputSchema: z.object({ orderId: z.string() }),
    outputSchema: z.string(),
  },
  async ({ orderId }) => getOrderStatus(orderId)
);


const WhatsAppOrderInputSchema = z.object({
  customerMessage: z.string().describe('The message from the customer.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The history of the conversation so far.'),
  currentStock: z.string().describe('The current stock level of each product.'),
  businessName: z.string().describe('The name of the restaurant.'),
});
export type WhatsAppOrderInput = z.infer<typeof WhatsAppOrderInputSchema>;

const WhatsAppOrderOutputSchema = z.object({
  response: z.string().describe('The response to the customer.'),
  orderItems: z.array(z.object({
    productId: z.string(),
    productName: z.string(),
    quantity: z.number(),
    notes: z.string().optional().describe('Special notes or requests for the item.'),
  })).describe('The items identified in the order.'),
  customerName: z.string().optional().describe("The customer's name."),
  customerPhone: z.string().optional().describe("The customer's phone number."),
  customerAddress: z.string().optional().describe("The customer's delivery address."),
  orderComplete: z.boolean().describe('Whether the order is considered complete and ready for confirmation.'),
});
export type WhatsAppOrderOutput = z.infer<typeof WhatsAppOrderOutputSchema>;

export async function whatsAppOrder(
  input: WhatsAppOrderInput
): Promise<WhatsAppOrderOutput> {
  return whatsAppOrderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'whatsAppOrderPrompt',
  input: { schema: WhatsAppOrderInputSchema },
  output: { schema: WhatsAppOrderOutputSchema },
  tools: [createOrderTool, getOrderStatusTool],
  prompt: `You are an AI assistant for a restaurant called "{{businessName}}", taking an order via WhatsApp. Your goal is to create a complete order for delivery or to check an order's status.

Conversation Context:
- This is the conversation history: {{{json conversationHistory}}}

Your instructions:
1.  **Initial Interaction**: If the conversation history is empty, greet the customer warmly, introduce yourself as the AI assistant for {{businessName}}, and ask if they want to place a new order or check the status of an existing one. Do not repeat the greeting in subsequent messages.
2.  **Order Status Check**: If the user wants to check their order status, ask for their order ID. Once they provide it, use the 'getOrderStatus' tool to retrieve the status and inform the customer. Handle cases where the order ID is invalid.
3.  **Placing a New Order**: If the user wants to place an order, analyze their message to extract product names, quantities, and any special notes (e.g., "sin cebolla", "extra picante"). Be smart about variations (e.g., "dos tintos" means 2 "Tinto Campesino").
4.  **Stock & Confirmation**: For each item, check availability against the current stock. If an item is out of stock or the quantity is too high, politely inform the customer. Once the customer seems finished, list the items back to them for confirmation.
5.  **Collect Customer Info**: After items are confirmed, ask for their full name, phone number, and delivery address. Do not ask for this before item confirmation.
6.  **Create the Order**: Once you have the items AND all customer details (name, phone, address), use the 'createOrder' tool to finalize the order. Inform the customer that their order has been created and provide them with their new order ID from the tool's output.
7.  **Completion**: Only when the order has been successfully created using the tool, set 'orderComplete' to true. In all other intermediate steps, 'orderComplete' must be false.
8.  **Clarity**: If any message is unclear, ask for clarification. Your responses should be friendly, concise, and in Spanish.

Available Products (use for order creation):
{{{currentStock}}}

Customer's Latest Message:
"{{customerMessage}}"`,
});

const whatsAppOrderFlow = ai.defineFlow(
  {
    name: 'whatsAppOrderFlow',
    inputSchema: WhatsAppOrderInputSchema,
    outputSchema: WhatsAppOrderOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
```

---
---

### Archivo: `src/ai/genkit.ts`

```ts
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
```

---
---

### Archivo: `src/app/dashboard/components/team-performance.tsx`

```tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UserContext } from "@/context/user-context";
import { getOrders } from "@/services/order-service";
import { Order, User, UserRole } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { ShoppingCart, TrendingUp, Trophy, Users } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { renderAvatar } from "@/lib/user-avatar";

type PerformanceData = {
    user: User;
    totalRevenue: number;
    salesCount: number;
    averageSale: number;
    contribution: number;
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(amount);
};

const getRoleBadgeVariant = (role: UserRole): "default" | "secondary" | "outline" | "destructive" | "success" | "info" => {
    switch (role) {
        case 'Administrador':
            return 'default';
        case 'Mesero':
        case 'Vendedor':
            return 'info';
        case 'Bartender':
        case 'Cajero':
            return 'success';
        default:
            return 'secondary';
    }
};

export function TeamPerformance() {
    const userContext = useContext(UserContext);
    const users = userContext?.users || [];
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchAndSetOrders = async () => {
            const allOrders = await getOrders();
            const paidOrders = allOrders.filter(o => o.status === 'Pagado');
            setOrders(paidOrders);
        };
        fetchAndSetOrders();
    }, []);

    const performanceData = useMemo(() => {
        if (!users.length || !orders.length) return [];
        
        const sellers = users.filter(u => u.role !== 'Administrador');
        const performanceMap = new Map<string, { totalRevenue: number, salesCount: number }>();

        orders.forEach(order => {
            if (order.userId) {
                const data = performanceMap.get(order.userId) || { totalRevenue: 0, salesCount: 0 };
                data.totalRevenue += order.total;
                data.salesCount += 1;
                performanceMap.set(order.userId, data);
            }
        });

        const totalOverallRevenue = Array.from(performanceMap.values()).reduce((sum, current) => sum + current.totalRevenue, 0);

        const performance: PerformanceData[] = sellers.map(user => {
            const data = performanceMap.get(user.id) || { totalRevenue: 0, salesCount: 0 };
            return {
                user,
                totalRevenue: data.totalRevenue,
                salesCount: data.salesCount,
                averageSale: data.salesCount > 0 ? data.totalRevenue / data.salesCount : 0,
                contribution: totalOverallRevenue > 0 ? (data.totalRevenue / totalOverallRevenue) * 100 : 0
            };
        }).sort((a, b) => b.totalRevenue - a.totalRevenue);

        return performance;
    }, [users, orders]);

    const totalSales = useMemo(() => orders.length, [orders]);
    const totalRevenue = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);
    const activeMembers = useMemo(() => performanceData.filter(p => p.salesCount > 0).length, [performanceData]);
    const averagePerPerson = activeMembers > 0 ? totalRevenue / activeMembers : 0;
    const averageSalesCount = activeMembers > 0 ? totalSales / activeMembers : 0;


    const getRankStyles = (rank: number) => {
        switch (rank) {
            case 0: return {
                bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
                textColor: "text-yellow-600 dark:text-yellow-400",
                medalColor: "text-yellow-500",
                borderColor: "border-yellow-200 dark:border-yellow-800"
            };
            case 1: return {
                bgColor: "bg-gray-200 dark:bg-gray-700/50",
                textColor: "text-gray-600 dark:text-gray-400",
                medalColor: "text-gray-500",
                borderColor: "border-gray-300 dark:border-gray-600"
            };
            case 2: return {
                bgColor: "bg-orange-100 dark:bg-orange-900/50",
                textColor: "text-orange-600 dark:text-orange-400",
                medalColor: "text-orange-500",
                borderColor: "border-orange-200 dark:border-orange-800"
            };
            default: return {
                bgColor: "bg-muted/30",
                textColor: "text-muted-foreground",
                medalColor: "text-muted-foreground",
                borderColor: "border-transparent"
            };
        }
    }


    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Users className="h-5 w-5" />
                    </div>
                    <div>
                        <CardTitle>Rendimiento del Equipo</CardTitle>
                        <CardDescription>Período: Hoy</CardDescription>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                    <p className="text-xs text-muted-foreground">{totalSales} ventas totales</p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-3">
                    {performanceData.map((data, index) => {
                        const rankStyles = getRankStyles(index);
                        return (
                            <div key={data.user.id} className={cn("grid grid-cols-[auto,1fr,auto] items-center gap-4 rounded-lg p-3 border", rankStyles.borderColor, index > 2 ? "" : rankStyles.bgColor )}>
                                <div className="flex items-center gap-4">
                                     <div className={cn("flex h-8 w-8 items-center justify-center rounded-full font-bold", rankStyles.bgColor, rankStyles.textColor)}>
                                        {index < 3 ? <Trophy className={cn("h-5 w-5", rankStyles.medalColor)} /> : <span>{index + 1}</span>}
                                    </div>
                                    {renderAvatar(data.user)}
                                    <div>
                                        <p className="font-semibold">{data.user.name}</p>
                                        <p className="text-xs text-muted-foreground">@{data.user.email.split('@')[0]}</p>
                                    </div>
                                     <Badge variant={getRoleBadgeVariant(data.user.role)}>{data.user.role}</Badge>
                                </div>

                                <div className="grid grid-cols-4 gap-4 items-center text-sm">
                                    <div>
                                        <p className="font-semibold text-green-600">{formatCurrency(data.totalRevenue)}</p>
                                        <p className="text-xs text-muted-foreground">Ingresos</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold">{data.salesCount}</p>
                                            <p className="text-xs text-muted-foreground">Ventas</p>
                                        </div>
                                    </div>
                                     <div className="flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold">{formatCurrency(data.averageSale)}</p>
                                            <p className="text-xs text-muted-foreground">Promedio</p>
                                        </div>
                                    </div>
                                     <div className="flex items-center gap-2">
                                        <Progress value={data.contribution} className="w-24 h-2" />
                                        <p className="text-xs font-semibold">{data.contribution.toFixed(1)}%</p>
                                    </div>
                                </div>

                                <div />
                            </div>
                        )
                    })}
                </div>
            </CardContent>
             <CardFooter className="mt-4 justify-around border-t pt-6">
                <div className="text-center">
                    <p className="text-2xl font-bold">{activeMembers}</p>
                    <p className="text-xs text-muted-foreground">Miembros activos</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(averagePerPerson)}</p>
                    <p className="text-xs text-muted-foreground">Promedio por persona</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold">{Math.round(averageSalesCount)}</p>
                    <p className="text-xs text-muted-foreground">Ventas promedio</p>
                </div>
            </CardFooter>
        </Card>
    );
}
```

---
---

### Archivo: `src/app/dashboard/integrations/components/analytics-integration-dialog.tsx`

```tsx
'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { type DialogProps } from "@radix-ui/react-dialog";

export function AnalyticsIntegrationDialog(props: DialogProps) {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the form data
        toast({
            title: `¡Integración con Google Analytics guardada!`,
            description: "La configuración se ha guardado correctamente.",
        });
        props.onOpenChange?.(false);
    }

    return (
        <Dialog {...props}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Configurar Google Analytics</DialogTitle>
                        <DialogDescription>
                            Ingresa tu ID de Medición y elige qué eventos rastrear.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="ga-measurement-id">Measurement ID</Label>
                            <Input id="ga-measurement-id" type="text" placeholder="G-XXXXXXXXXX" />
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Configuración de Eventos</h4>
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <Label htmlFor="track-sales" className="flex flex-col gap-1">
                                    <span>Seguimiento de Ventas</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Envía un evento 'purchase' cuando se completa una venta.
                                    </span>
                                </Label>
                                <Switch id="track-sales" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <Label htmlFor="track-product-views" className="flex flex-col gap-1">
                                    <span>Vistas de Producto</span>
                                     <span className="font-normal leading-snug text-muted-foreground">
                                        Envía un evento 'view_item' al ver un producto.
                                    </span>
                                </Label>
                                <Switch id="track-product-views" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between rounded-lg border p-3">
                                <Label htmlFor="track-add-to-cart" className="flex flex-col gap-1">
                                    <span>Añadir al Carrito</span>
                                     <span className="font-normal leading-snug text-muted-foreground">
                                        Envía un evento 'add_to_cart' al añadir un producto.
                                    </span>
                                </Label>
                                <Switch id="track-add-to-cart" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => props.onOpenChange?.(false)}>Cancelar</Button>
                        <Button type="submit">Guardar Configuración</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
```

---
---

### Archivo: `src/app/dashboard/integrations/components/delivery-integration-dialog.tsx`

```tsx
'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { type DialogProps } from "@radix-ui/react-dialog";

type IntegrationId = 'rappi' | 'didifood' | 'ubereats' | null;

interface DeliveryIntegrationDialogProps extends DialogProps {
    integrationId: IntegrationId;
}

const integrationConfig = {
    rappi: {
        title: "Configurar Rappi",
        description: "Ingresa tus credenciales de la API de Rappi para conectar tu tienda.",
        fields: [
            { id: "rappi-client-id", name: "Client ID", type: "text", placeholder: "Ej: 12345" },
            { id: "rappi-client-secret", name: "Client Secret", type: "password", placeholder: "••••••••••••" },
        ],
    },
    didifood: {
        title: "Configurar Didi Food",
        description: "Ingresa tus credenciales de la API de Didi Food para empezar.",
        fields: [
            { id: "didi-app-id", name: "App ID", type: "text", placeholder: "Ej: 5a6b7c8d" },
            { id: "didi-app-secret", name: "App Secret", type: "password", placeholder: "••••••••••••" },
            { id: "didi-shop-id", name: "Shop ID", type: "text", placeholder: "Ej: 98765" },
        ],
    },
    ubereats: {
        title: "Configurar Uber Eats",
        description: "Ingresa la información de tu API de Uber Eats.",
        fields: [
            { id: "uber-client-id", name: "Client ID", type: "text", placeholder: "ID de cliente de Uber" },
            { id: "uber-client-secret", name: "Client Secret", type: "password", placeholder: "••••••••••••" },
            { id: "uber-store-id", name: "Store ID", type: "text", placeholder: "ID de tu tienda en Uber Eats" },
        ],
    },
};

export function DeliveryIntegrationDialog({ integrationId, ...props }: DeliveryIntegrationDialogProps) {
    const { toast } = useToast();

    if (!integrationId) return null;

    const config = integrationConfig[integrationId];
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the form data
        console.log(`Saving configuration for ${config.title}`);
        toast({
            title: `¡Integración con ${config.title.split(' ')[1]} guardada!`,
            description: "La configuración se ha guardado correctamente.",
        });
        props.onOpenChange?.(false);
    }

    return (
        <Dialog {...props}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{config.title}</DialogTitle>
                        <DialogDescription>
                            {config.description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {config.fields.map(field => (
                            <div key={field.id} className="grid gap-2">
                                <Label htmlFor={field.id}>{field.name}</Label>
                                <Input id={field.id} type={field.type} placeholder={field.placeholder} />
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => props.onOpenChange?.(false)}>Cancelar</Button>
                        <Button type="submit">Guardar Configuración</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
```

---
---

### Archivo: `src/app/dashboard/integrations/components/whatsapp-integration-dialog.tsx`

```tsx
'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Copy } from "lucide-react";

export function WhatsAppIntegrationDialog(props: DialogProps) {
    const { toast } = useToast();
    // In a real app, this would come from your backend configuration
    const webhookUrl = "https://your-app-domain.com/api/whatsapp/webhook";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: `¡Integración con WhatsApp guardada!`,
            description: "La configuración se ha guardado correctamente.",
        });
        props.onOpenChange?.(false);
    }
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(webhookUrl);
        toast({
            title: '¡Copiado!',
            description: 'La URL del webhook se ha copiado al portapapeles.',
        });
    }

    return (
        <Dialog {...props}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Configurar WhatsApp Business API</DialogTitle>
                        <DialogDescription>
                            Conecta tu cuenta para empezar a recibir pedidos a través de WhatsApp.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="wa-phone-id">ID del Número de Teléfono</Label>
                            <Input id="wa-phone-id" type="text" placeholder="Ej: 1065...9718" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="wa-api-token">Token de Acceso de la API</Label>
                            <Input id="wa-api-token" type="password" placeholder="••••••••••••••••••••••••••••••••••" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="wa-webhook-url">URL del Webhook</Label>
                             <div className="flex items-center space-x-2">
                                <Input id="wa-webhook-url" type="text" readOnly value={webhookUrl} />
                                <Button type="button" variant="outline" size="icon" onClick={copyToClipboard}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Copia esta URL y pégala en la configuración de webhooks de tu aplicación de Meta.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => props.onOpenChange?.(false)}>Cancelar</Button>
                        <Button type="submit">Guardar Configuración</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
```

---
---

### Archivo: `src/app/dashboard/integrations/page.tsx`

```tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { MessageCircle, BarChart, ExternalLink, UtensilsCrossed } from "lucide-react";
import { Button } from '@/components/ui/button';
import { DeliveryIntegrationDialog } from './components/delivery-integration-dialog';
import { AnalyticsIntegrationDialog } from './components/analytics-integration-dialog';
import { WhatsAppIntegrationDialog } from './components/whatsapp-integration-dialog';

const deliveryIntegrations = [
    {
        id: "rappi" as const,
        name: "Rappi",
        description: "Sincroniza tu menú y recibe pedidos directamente desde Rappi.",
        logo: <UtensilsCrossed className="h-6 w-6 text-red-500" />,
        docUrl: "https://devs.rappi.com/docs"
    },
    {
        id: "didifood" as const,
        name: "Didi Food",
        description: "Conecta tu cuenta de Didi Food para gestionar pedidos sin problemas.",
        logo: <UtensilsCrossed className="h-6 w-6 text-orange-500" />,
        docUrl: "https://out.didi-food.com/docs/api"
    },
    {
        id: "ubereats" as const,
        name: "Uber Eats",
        description: "Intégrate con Uber Eats para el procesamiento automatizado de pedidos.",
        logo: <UtensilsCrossed className="h-6 w-6 text-green-500" />,
        docUrl: "https://developer.uber.com/docs/eats"
    }
];

type DeliveryIntegrationId = typeof deliveryIntegrations[number]['id'];

const otherIntegrations = [
    {
        id: "whatsapp" as const,
        name: "WhatsApp AI Agent",
        description: "Activa el asistente IA para tomar pedidos a través de WhatsApp.",
        logo: <MessageCircle className="h-6 w-6 text-green-500" />,
        docUrl: "https://developers.facebook.com/docs/whatsapp/cloud-api"
    },
    {
        id: "analytics" as const,
        name: "Google Analytics",
        description: "Conecta Google Analytics para obtener información sobre los visitantes.",
        logo: <BarChart className="h-6 w-6 text-blue-500" />,
        docUrl: "https://developers.google.com/analytics/devguides/collection/ga4"
    },
]

export default function IntegrationsPage() {
    const [openDialog, setOpenDialog] = useState<DeliveryIntegrationId | null>(null);
    const [isAnalyticsOpen, setAnalyticsOpen] = useState(false);
    const [isWhatsAppOpen, setWhatsAppOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Integraciones de Plataformas de Delivery</h1>
                    <p className="text-muted-foreground">Conecta tus cuentas para optimizar tus operaciones de entrega.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {deliveryIntegrations.map((integration) => (
                        <Card key={integration.name} className="flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">{integration.logo}</div>
                                    <div>
                                        <CardTitle className="font-semibold">{integration.name}</CardTitle>
                                    </div>
                                </div>
                                <Switch />
                            </CardHeader>
                            <CardContent className="flex-1">
                                <CardDescription>{integration.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="justify-end gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={integration.docUrl} target="_blank">
                                        Documentación <ExternalLink className="ml-2 h-3 w-3"/>
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setOpenDialog(integration.id)}>Configurar</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Otras Integraciones</h2>
                    <p className="text-muted-foreground">Conecta herramientas adicionales para potenciar tu negocio.</p>
                </div>
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {otherIntegrations.map((integration) => (
                        <Card key={integration.name} className="flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                     <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">{integration.logo}</div>
                                    <div>
                                        <CardTitle className="font-semibold">{integration.name}</CardTitle>
                                    </div>
                                </div>
                                <Switch defaultChecked={integration.id === 'whatsapp'}/>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <CardDescription>{integration.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="justify-end gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={integration.docUrl} target="_blank">
                                        Documentación <ExternalLink className="ml-2 h-3 w-3"/>
                                    </Link>
                                </Button>
                                 <Button variant="outline" size="sm" onClick={() => {
                                    if (integration.id === 'analytics') setAnalyticsOpen(true);
                                    if (integration.id === 'whatsapp') setWhatsAppOpen(true);
                                }}>Configurar</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            <DeliveryIntegrationDialog
                integrationId={openDialog}
                open={!!openDialog}
                onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
            />
            <AnalyticsIntegrationDialog
                open={isAnalyticsOpen}
                onOpenChange={setAnalyticsOpen}
            />
            <WhatsAppIntegrationDialog
                open={isWhatsAppOpen}
                onOpenChange={setWhatsAppOpen}
            />
        </>
    )
}
```

---
---

### Archivo: `src/app/dashboard/inventory/actions.ts`

```ts
'use server';

import { suggestReorderQuantities, type InventoryReorderInput } from '@/ai/flows/inventory-reorder-suggestions';
import { products } from '@/lib/placeholder-data';
import { z } from 'zod';

const ReorderSchema = z.object({
    seasonality: z.string().min(1, 'Seasonality information is required.'),
    promotions: z.string().min(1, 'Promotions information is required.'),
    salesHistory: z.string().min(1, 'Sales history is required.'),
});

export async function getReorderSuggestions(prevState: any, formData: FormData) {
  const validatedFields = ReorderSchema.safeParse({
    seasonality: formData.get('seasonality'),
    promotions: formData.get('promotions'),
    salesHistory: formData.get('salesHistory'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please fill out all fields.',
      data: null
    };
  }

  try {
    const currentStock = products.map(p => `${p.name}: ${p.stock} units`).join('\n');
    
    const input: InventoryReorderInput = {
      salesHistory: validatedFields.data.salesHistory,
      currentStock,
      seasonality: validatedFields.data.seasonality,
      promotions: validatedFields.data.promotions,
    };

    const result = await suggestReorderQuantities(input);

    return {
      message: 'success',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while getting suggestions from AI.',
      data: null
    };
  }
}
```

---
---

### Archivo: `src/app/dashboard/inventory/components/reorder-form.tsx`

```tsx
'use client';

import React, { useEffect, useState, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Bot, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getReorderSuggestions } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { products } from '@/lib/placeholder-data';
import type { InventoryReorderOutput } from '@/ai/flows/inventory-reorder-suggestions';

type InitialState = {
  message: string;
  data: InventoryReorderOutput | null;
}

const initialState: InitialState = {
  message: '',
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
      Obtener Sugerencias
    </Button>
  );
}

export function ReorderForm() {
  const [state, formAction] = useActionState(getReorderSuggestions, initialState);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [salesHistory, setSalesHistory] = useState('Generating sales history...');
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    // This will only run on the client, after initial hydration
    const history = products.map(p => `${p.name}: sold approx. ${Math.floor(Math.random() * 50) + 10} last month.`).join('\n');
    setSalesHistory(history);
  }, []);

  useEffect(() => {
    if (state.message === 'success' && state.data) {
      setShowSuccess(true);
    } else if (state.message && state.message !== 'Invalid form data. Please fill out all fields.' && state.message !== 'Generating sales history...') {
      setShowSuccess(false);
      toast({
          variant: 'destructive',
          title: 'Error',
          description: state.message,
      });
    }
  }, [state, toast]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
        setShowSuccess(false);
        formRef.current?.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Bot className="mr-2 h-4 w-4" /> Sugerencias de IA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form action={formAction} ref={formRef}>
          <DialogHeader>
            <DialogTitle>Sugerencias Inteligentes de Reposición</DialogTitle>
            <DialogDescription>
              Deja que la IA analice tus datos para sugerir cantidades óptimas de reposición. Proporciona contexto adicional a continuación.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <input type="hidden" name="salesHistory" value={salesHistory} />
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="seasonality">Estacionalidad y Eventos</Label>
              <Textarea
                id="seasonality"
                name="seasonality"
                placeholder="Ej: Próxima temporada de vacaciones, festival local el próximo mes, se espera mayor afluencia de público los fines de semana."
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="promotions">Promociones y Marketing</Label>
              <Textarea
                id="promotions"
                name="promotions"
                placeholder="Ej: Promoción 2x1 en café la próxima semana, aparición en un blog de comida local."
                required
              />
            </div>
          </div>

          {showSuccess && state.data && state.data.reorderSuggestions && (
            <Alert>
              <Bot className="h-4 w-4" />
              <AlertTitle>Recomendación de IA</AlertTitle>
              <AlertDescription>
                <div className='prose prose-sm dark:prose-invert max-w-full'>
                    <p className='font-semibold'>Sugerencias:</p>
                    <pre className="whitespace-pre-wrap font-sans text-sm">{state.data.reorderSuggestions}</pre>
                    <p className='font-semibold mt-2'>Justificación:</p>
                    <p>{state.data.rationale}</p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <DialogFooter className='mt-4'>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

---
---

### Archivo: `src/app/dashboard/inventory/page.tsx`

```tsx
'use client';

import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { products as initialProducts, Product } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Image as ImageIcon, Pencil, Trash2, Shapes } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ReorderForm } from "./components/reorder-form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CategoryContext } from "@/context/category-context";
import { Combobox } from "@/components/ui/combobox";

function getStockStatus(stock: number): { text: string; variant: "default" | "secondary" | "destructive" | "outline" } {
  if (stock === 0) return { text: "Agotado", variant: "destructive" };
  if (stock < 10) return { text: "Stock bajo", variant: "secondary" };
  return { text: "En stock", variant: "default" };
}

function CategoryManager({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const categoryContext = useContext(CategoryContext);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState<{ id: string, name: string } | null>(null);

    if (!categoryContext) return null;
    const { categories, addCategory, updateCategory, deleteCategory } = categoryContext;

    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            addCategory(newCategoryName.trim());
            setNewCategoryName('');
        }
    };
    
    const handleUpdateCategory = () => {
        if (editingCategory && editingCategory.name.trim()) {
            updateCategory(editingCategory.id, editingCategory.name.trim());
            setEditingCategory(null);
        }
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Gestionar Categorías</DialogTitle>
                    <CardDescription>Añade, edita o elimina las categorías de tus productos.</CardDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Nombre de la nueva categoría"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <Button onClick={handleAddCategory}>Agregar</Button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {categories.map(cat => (
                            <div key={cat.id} className="flex items-center justify-between p-2 border rounded-md">
                                {editingCategory?.id === cat.id ? (
                                    <Input
                                        value={editingCategory.name}
                                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                        className="flex-1"
                                    />
                                ) : (
                                    <span className="flex-1">{cat.name}</span>
                                )}
                                <div className="flex gap-1">
                                     {editingCategory?.id === cat.id ? (
                                        <Button size="sm" onClick={handleUpdateCategory}>Guardar</Button>
                                     ) : (
                                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditingCategory(cat)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                     )}
                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => deleteCategory(cat.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function InventoryPage() {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [newProductImage, setNewProductImage] = useState<string | null>(null);
  const [editingProductImage, setEditingProductImage] = useState<string | null>(null);
  const [newProductCategory, setNewProductCategory] = useState('');
  const [editingProductCategory, setEditingProductCategory] = useState('');
  const [isCategoryManagerOpen, setCategoryManagerOpen] = useState(false);
  const categoryContext = useContext(CategoryContext);
  
  useEffect(() => {
    if (editingProduct) {
      setEditingProductImage(editingProduct.imageUrl);
      setEditingProductCategory(editingProduct.category);
    } else {
      setEditingProductImage(null);
      setEditingProductCategory('');
    }
  }, [editingProduct]);

  const categoryOptions = categoryContext ? categoryContext.categories.map(c => ({ value: c.name, label: c.name })) : [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
  };
  
  const handleEditSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    const formData = new FormData(e.currentTarget);
    const updatedProduct = {
      ...editingProduct,
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      sku: formData.get('sku') as string,
      category: editingProductCategory,
      imageUrl: editingProductImage || editingProduct.imageUrl,
      imageHint: formData.get('imageHint') as string,
      cost: Number(formData.get('cost') ?? editingProduct.cost),
    };
    
    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
  }

  const handleDeleteClick = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, forEditing: boolean) => {
      if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
              if (forEditing) {
                setEditingProductImage(reader.result as string);
              } else {
                setNewProductImage(reader.result as string);
              }
          };
          reader.readAsDataURL(file);
      }
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      name: formData.get('name') as string,
      category: newProductCategory || 'General',
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      sku: formData.get('sku') as string || `SKU-${Date.now()}`,
      imageUrl: newProductImage || `https://picsum.photos/seed/${Date.now()}/200/150`,
      imageHint: formData.get('imageHint') as string || 'new product',
      cost: Number(formData.get('cost') || 0),
    };
    setProducts([newProduct, ...products]);
    setAddDialogOpen(false);
    setNewProductImage(null);
    setNewProductCategory('');
    (e.target as HTMLFormElement).reset();
  };
    
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-bold tracking-tight">Inventario</CardTitle>
            <CardDescription>Gestiona tus productos y niveles de stock.</CardDescription>
          </div>
          <div className="flex gap-2">
              <ReorderForm />
              <Button onClick={() => setCategoryManagerOpen(true)}>
                <Shapes className="mr-2 h-4 w-4" /> Gestionar Categorías
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Agregar Producto
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                    <CardDescription>Completa la información para registrar un nuevo artículo en tu inventario.</CardDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddProduct}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                      {/* Left Column for Image */}
                      <div className="flex flex-col items-center justify-center gap-2">
                          <div className="flex h-40 w-40 items-center justify-center rounded-md border-2 border-dashed bg-muted">
                              {newProductImage ? (
                                  <Image src={newProductImage} alt="Previsualización del producto" width={160} height={160} className="object-contain rounded-md" />
                              ) : (
                                  <ImageIcon className="h-16 w-16 text-muted-foreground" />
                              )}
                          </div>
                          <input type="file" id="image-upload" onChange={(e) => handleImageUpload(e, false)} accept="image/*" className="hidden" />
                          <Button type="button" size="sm" variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>Subir Imagen</Button>
                      </div>
                      
                      {/* Right Column for data */}
                      <div className="grid gap-4">
                          <div className="grid gap-2">
                              <Label htmlFor="add-name">Nombre del Producto</Label>
                              <Input id="add-name" name="name" placeholder="Ej: Café Americano" required />
                          </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="add-price">Precio</Label>
                                <Input id="add-price" name="price" type="number" placeholder="Ej: 5000" required />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="add-stock">Stock Inicial</Label>
                                <Input id="add-stock" name="stock" type="number" placeholder="Ej: 100" required />
                              </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="add-sku">SKU (Código)</Label>
                                <Input id="add-sku" name="sku" placeholder="Ej: CF-002" />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="add-category">Categoría</Label>
                                <Combobox
                                    options={categoryOptions}
                                    value={newProductCategory}
                                    onSelect={setNewProductCategory}
                                    placeholder="Seleccionar categoría..."
                                    searchPlaceholder="Buscar categoría..."
                                />
                            </div>
                          </div>
                           <div className="grid gap-2">
                                <Label htmlFor="add-imageHint">Descripción de Imagen (para IA)</Label>
                                <Input id="add-imageHint" name="imageHint" placeholder="Ej: taza de café" />
                            </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>Cancelar</Button>
                      <Button type="submit">Agregar Producto</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Imagen</span>
                </TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="hidden md:table-cell">
                  Stock
                </TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const status = getStockStatus(product.stock);
                return (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.imageUrl}
                        width="64"
                        data-ai-hint={product.imageHint}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.text}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.stock}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditClick(product)}>Editar</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(product.id)}>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={!!editingProduct} onOpenChange={(isOpen) => !isOpen && setEditingProduct(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Producto: {editingProduct?.name}</DialogTitle>
             <CardDescription>Actualiza la información de este artículo.</CardDescription>
          </DialogHeader>
          <form onSubmit={handleEditSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex h-40 w-40 items-center justify-center rounded-md border-2 border-dashed bg-muted">
                        {editingProductImage ? (
                            <Image src={editingProductImage} alt="Previsualización del producto" width={160} height={160} className="object-contain rounded-md" />
                        ) : (
                            <ImageIcon className="h-16 w-16 text-muted-foreground" />
                        )}
                    </div>
                    <input type="file" id="edit-image-upload" onChange={(e) => handleImageUpload(e, true)} accept="image/*" className="hidden" />
                    <Button type="button" size="sm" variant="outline" onClick={() => document.getElementById('edit-image-upload')?.click()}>Cambiar Imagen</Button>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre del Producto</Label>
                        <Input id="name" name="name" defaultValue={editingProduct?.name} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Precio</Label>
                            <Input id="price" name="price" type="number" defaultValue={editingProduct?.price} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" name="stock" type="number" defaultValue={editingProduct?.stock} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="sku">SKU (Código)</Label>
                            <Input id="sku" name="sku" defaultValue={editingProduct?.sku} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Categoría</Label>
                             <Combobox
                                options={categoryOptions}
                                value={editingProductCategory}
                                onSelect={setEditingProductCategory}
                                placeholder="Seleccionar categoría..."
                                searchPlaceholder="Buscar categoría..."
                            />
                        </div>
                    </div>
                     <div className="grid gap-2">
                          <Label htmlFor="imageHint">Descripción de Imagen (para IA)</Label>
                          <Input id="imageHint" name="imageHint" defaultValue={editingProduct?.imageHint} />
                      </div>
                </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>Cancelar</Button>
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <CategoryManager open={isCategoryManagerOpen} onOpenChange={setCategoryManagerOpen} />
    </>
  );
}
```

---
---

### Archivo: `src/app/dashboard/layout.tsx`

```tsx
'use client';

import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
import React, { useEffect, useRef, useState, useContext } from "react";
import {
  BarChart,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  MonitorSmartphone,
  Settings,
  Package,
  MessageCircle,
  Palette,
  Moon,
  Sun,
  Loader2,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { UserNav } from "@/components/user-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserContext } from "@/context/user-context";
import { useTheme } from "@/context/theme-context";

const allNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Panel", roles: ['Administrador', 'Mesero', 'Vendedor', 'Bartender', 'Cajero'] },
  { href: "/dashboard/pos", icon: MonitorSmartphone, label: "Punto de Venta", roles: ['Administrador', 'Mesero', 'Vendedor', 'Bartender', 'Cajero'] },
  { href: "/dashboard/orders", icon: ClipboardList, label: "Pedidos", roles: ['Administrador', 'Mesero', 'Vendedor', 'Bartender', 'Cajero'] },
  { href: "/dashboard/inventory", icon: Boxes, label: "Inventario", roles: ['Administrador'] },
  { href: "/dashboard/reports", icon: BarChart, label: "Reportes", roles: ['Administrador'] },
  { href: "/dashboard/integrations", icon: Package, label: "Integraciones", roles: ['Administrador'] },
  { href: "/dashboard/whatsapp", icon: MessageCircle, label: "WhatsApp", roles: ['Administrador', 'Mesero', 'Vendedor', 'Bartender', 'Cajero'] },
  { href: "/dashboard/settings", icon: Settings, label: "Configuración", roles: ['Administrador'] },
];

function DashboardNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const { currentUser } = useContext(UserContext)!;

  const navItems = allNavItems.filter(item => currentUser?.role && item.roles.includes(currentUser.role));

  const isNavItemActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    // We need a slight delay to ensure the DOM is fully updated after role change
    setTimeout(() => {
      const activeLink = navRef.current?.querySelector<HTMLAnchorElement>('[data-active="true"]');
      if (activeLink) {
          setIndicatorStyle({
              width: activeLink.offsetWidth,
              left: activeLink.offsetLeft,
              opacity: 1,
          });
      } else {
        // If no active link is found (e.g., on a restricted page), hide the indicator
        setIndicatorStyle({ width: 0, left: 0, opacity: 0 });
      }
    }, 50);
  }, [pathname, navItems]);

  return (
    <nav ref={navRef} className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-4 bg-muted p-1 rounded-full relative">
      <div 
        className="absolute h-[calc(100%-0.5rem)] bg-background shadow-sm rounded-full transition-all duration-300 ease-in-out"
        style={indicatorStyle}
      />
      {navItems.map((item) => {
          const isActive = isNavItemActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive}
              className={cn(
                "transition-all px-3 py-1.5 rounded-full text-xs font-medium z-10 flex items-center gap-2 whitespace-nowrap",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
      })}
    </nav>
  );
}

function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userContext = useContext(UserContext);
  const pathname = usePathname();

  if (!userContext) {
    // This case should ideally not happen if providers are set up correctly
    return <div className="flex h-screen w-full items-center justify-center">Initializing context...</div>;
  }
  
  const { currentUser, isInitialized } = userContext;

  useEffect(() => {
    // Redirect to login if initialization is complete and there's no user
    if (isInitialized && !currentUser) {
      redirect('/login');
    }
  }, [isInitialized, currentUser]);

  const navItems = currentUser ? allNavItems.filter(item => item.roles.includes(currentUser.role)) : [];
  
  const isNavItemActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };


  // Show a loading screen while initializing or if user data isn't ready post-auth
  if (!isInitialized || !currentUser) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    );
  }

  return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-20">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold md:text-base mr-4"
          >
            <Logo />
          </Link>
          <DashboardNav />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo />
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 hover:text-foreground",
                    isNavItemActive(item.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <div className="ml-auto flex items-center gap-2">
                <ThemeToggle />
                <UserNav />
              </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
  );
}
```

---
---

### Archivo: `src/app/dashboard/orders/page.tsx`

```tsx
'use client';

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { type Order, type Product } from '@/lib/placeholder-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Loader2, PlusCircle, MinusCircle, Search, Pencil } from 'lucide-react';
import Image from 'next/image';
import { getOrders, createOrder, updateOrderStatus, updateOrderItems, type OrderItem } from '@/services/order-service';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { products as allProducts } from '@/lib/placeholder-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserContext } from '@/context/user-context';

const OrderCard = ({ order, onStatusChange, onEditOrder }: { order: Order; onStatusChange: (id: string, status: Order['status']) => void, onEditOrder: (order: Order) => void }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateDate = () => {
        if(order.createdAt) {
            setTimeAgo(formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: es }));
        }
    }
    updateDate();
    const interval = setInterval(updateDate, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [order.createdAt]);


  const getBadgeVariant = (status: Order['status']): "default" | "secondary" | "destructive" | "outline" | "info" | "success" | "warning" | "delivery" => {
    switch (status) {
      case 'Pendiente':
        return 'secondary';
      case 'Preparando':
        return 'warning';
      case 'Listo':
        return 'info';
      case 'En entrega':
        return 'delivery';
      case 'Completado':
      case 'Pagado':
        return 'success';
      case 'Cancelado':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg">{order.id}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {order.customerName} &middot; {timeAgo}
          </p>
        </div>
        <Badge variant={getBadgeVariant(order.status)}>{order.status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            {order.items.map(({product, quantity}) => (
                <div key={product.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <Image src={product.imageUrl} alt={product.name} width={32} height={32} className="rounded-md object-cover" data-ai-hint={product.imageHint} />
                        <span>{product.name}</span>
                    </div>
                    <span>x {quantity}</span>
                </div>
            ))}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </CardContent>
      <CardFooter className='justify-end gap-2'>
        {order.status !== 'Cancelado' && order.status !== 'Completado' && order.status !== 'Pagado' && (
          <Button variant="outline" size="sm" onClick={() => onEditOrder(order)}>
              <Pencil className="mr-2 h-4 w-4" /> Modificar
          </Button>
        )}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={order.status === 'Completado' || order.status === 'Cancelado' || order.status === 'Pagado'}>
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem disabled={order.status === 'Preparando'} onClick={() => onStatusChange(order.id, 'Preparando')}>Marcar como Preparando</DropdownMenuItem>
                <DropdownMenuItem disabled={order.status === 'Listo'} onClick={() => onStatusChange(order.id, 'Listo')}>Marcar como Listo</DropdownMenuItem>
                <DropdownMenuItem disabled={order.status === 'En entrega'} onClick={() => onStatusChange(order.id, 'En entrega')}>Marcar como En Entrega</DropdownMenuItem>
                <DropdownMenuItem disabled={order.status === 'Completado'} onClick={() => onStatusChange(order.id, 'Completado')}>Marcar como Completado</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" disabled={order.status === 'Cancelado'} onClick={() => onStatusChange(order.id, 'Cancelado')}>Cancelar Orden</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

type CartItem = {
    product: Product;
    quantity: number;
};

type OrderDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onOrderUpdated: () => void;
    editingOrder?: Order | null;
}

const OrderDialog = ({ open, onOpenChange, onOrderUpdated, editingOrder = null }: OrderDialogProps) => {
    const [customerName, setCustomerName] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const userContext = useContext(UserContext);
    const { currentUser } = userContext!;

    useEffect(() => {
        if (editingOrder) {
            setCustomerName(editingOrder.customerName);
            setCart(editingOrder.items);
        } else {
            setCustomerName('');
            setCart([]);
        }
        setSearchTerm('');
        setSelectedCategory('Todos');
    }, [editingOrder, open]);


    const categories = ['Todos', ...Array.from(new Set(allProducts.map(p => p.category)))];

    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
        }).format(amount);
    };

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.product.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            setCart(cart.filter(item => item.product.id !== productId));
        } else {
            setCart(cart.map(item => item.product.id === productId ? { ...item, quantity: newQuantity } : item));
        }
    };
    
    const handleSubmit = async () => {
        if (!customerName || cart.length === 0) return;

        const itemsToSave: OrderItem[] = cart.map(item => ({ productId: item.product.id, quantity: item.quantity }));

        if (editingOrder) {
            await updateOrderItems(editingOrder.id, itemsToSave, customerName);
        } else {
            await createOrder({
                customerName: customerName,
                customerPhone: 'N/A', // Not collected in this form
                customerAddress: 'En local', // Default for manual orders
                items: itemsToSave,
                userId: currentUser?.id,
            });
        }


        onOrderUpdated();
        onOpenChange(false);
    };

    const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const dialogTitle = editingOrder ? `Modificar Pedido ${editingOrder.id}` : 'Crear Nuevo Pedido';
    const dialogDescription = editingOrder ? 'Añade o elimina productos del pedido actual.' : 'Busca productos, agrégalos al pedido y asigna un cliente.';
    const buttonText = editingOrder ? 'Guardar Cambios' : 'Crear Pedido';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl grid-rows-[auto,1fr,auto]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>
                        {dialogDescription}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
                    <div className="flex flex-col gap-4">
                        <h3 className='font-medium'>Productos Disponibles</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar productos..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                {categories.slice(0, 4).map(cat => (
                                     <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                        <ScrollArea className="h-96">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pr-4">
                               {filteredProducts.map(product => (
                                   <Card key={product.id} onClick={() => addToCart(product)} className="cursor-pointer transition-transform hover:scale-105">
                                        <CardContent className="p-0">
                                            <Image src={product.imageUrl} alt={product.name} width={150} height={100} className="w-full h-24 object-cover rounded-t-lg" data-ai-hint={product.imageHint} />
                                        </CardContent>
                                        <CardHeader className="p-2">
                                            <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
                                            <p className="text-xs text-muted-foreground">{formatCurrency(product.price)}</p>
                                        </CardHeader>
                                   </Card>
                               ))}
                            </div>
                        </ScrollArea>
                    </div>

                    <div className="flex flex-col bg-muted/50 p-4 rounded-lg">
                        <h3 className='font-medium mb-4'>Pedido Actual</h3>
                         <div className="mb-4">
                            <Label htmlFor="customer-name">Nombre del Cliente</Label>
                            <Input 
                                id="customer-name" 
                                placeholder="Ej: Mesa 5, Juan Pérez" 
                                value={customerName} 
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="bg-background"
                            />
                        </div>
                        <ScrollArea className="h-72 flex-1 bg-background rounded-md border">
                            {cart.length === 0 ? (
                                <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                                    El pedido está vacío.
                                </div>
                            ) : (
                                <div className="space-y-2 p-2">
                                    {cart.map(item => (
                                        <div key={item.product.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                                            <div>
                                                <span className='text-sm font-medium'>{item.product.name}</span>
                                                <p className="text-xs text-muted-foreground">{formatCurrency(item.product.price)}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><MinusCircle className="h-4 w-4" /></Button>
                                                <span className="text-sm font-bold">{item.quantity}</span>
                                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><PlusCircle className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                        <Separator className='my-4'/>
                         <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{formatCurrency(cartTotal)}</span>
                        </div>
                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSubmit} disabled={!customerName || cart.length === 0}>{buttonText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    const freshOrders = await getOrders();
    setOrders(freshOrders);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusChange = async (id: string, status: Order['status']) => {
    await updateOrderStatus(id, status);
    fetchOrders();
  };
  
  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setOrderDialogOpen(true);
  }
  
  const handleCreateOrder = () => {
      setEditingOrder(null);
      setOrderDialogOpen(true);
  }

  const activeOrders = orders.filter(o => o.status === 'Pendiente' || o.status === 'Preparando' || o.status === 'Listo' || o.status === 'En entrega').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const completedOrders = orders.filter(o => o.status === 'Completado' || o.status === 'Pagado').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const cancelledOrders = orders.filter(o => o.status === 'Cancelado').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const renderOrderList = (orderList: Order[]) => {
    if (isLoading && orders.length === 0) {
      return (
        <div className="flex justify-center items-center col-span-full p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )
    }
    if (orderList.length === 0) {
      return <p className="text-muted-foreground col-span-full p-8 text-center">No hay órdenes en esta categoría.</p>;
    }
    return orderList.map(order => (
      <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} onEditOrder={handleEditOrder} />
    ));
  };


  return (
    <>
        <div className='flex items-center justify-between'>
            <h1 className="text-2xl font-bold tracking-tight">Gestión de Pedidos</h1>
            <Button onClick={handleCreateOrder}>
                <PlusCircle className='mr-2 h-4 w-4' />
                Crear Pedido
            </Button>
        </div>
        <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Activas ({!isLoading || orders.length > 0 ? activeOrders.length : '...'})</TabsTrigger>
            <TabsTrigger value="completed">Completadas ({!isLoading || orders.length > 0 ? completedOrders.length : '...'})</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas ({!isLoading || orders.length > 0 ? cancelledOrders.length : '...'})</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderOrderList(activeOrders)}
            </div>
        </TabsContent>
        <TabsContent value="completed">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderOrderList(completedOrders)}
            </div>
        </TabsContent>
        <TabsContent value="cancelled">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderOrderList(cancelledOrders)}
            </div>
        </TabsContent>
        </Tabs>
        <OrderDialog 
            open={isOrderDialogOpen}
            onOpenChange={setOrderDialogOpen}
            onOrderUpdated={fetchOrders}
            editingOrder={editingOrder}
        />
    </>
  );
}
```

---
---

### Archivo: `src/app/dashboard/page.tsx`

```tsx
'use client';

import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TeamPerformance } from "./components/team-performance";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const cardClasses = "shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-200";

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/reports">
          <Card className={cn(cardClasses)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ingresos Totales
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(45231890)}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% desde el mes pasado
              </p>
            </CardContent>
          </Card>
        </Link>
         <Link href="/dashboard/reports">
          <Card className={cn(cardClasses)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nuevos Clientes
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% desde el mes pasado
              </p>
            </CardContent>
          </Card>
        </Link>
         <Link href="/dashboard/inventory">
            <Card className={cn(cardClasses)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                +19% desde el mes pasado
                </p>
            </CardContent>
            </Card>
        </Link>
         <Link href="/dashboard/inventory">
            <Card className={cn(cardClasses)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Items con Stock Bajo
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                2 items necesitan reposición inmediata
                </p>
            </CardContent>
            </Card>
        </Link>
      </div>

      <TeamPerformance />
    </div>
  )
}
```

---
---

### Archivo: `src/app/dashboard/pos/page.tsx`

```tsx
'use client';

import React, { useState, useEffect, useCallback, useContext } from 'react';
import Image from 'next/image';
import { PlusCircle, MinusCircle, X, CreditCard, Landmark, CircleDollarSign, Utensils, Receipt, HandCoins, Percent, Keyboard } from 'lucide-react';
import { products as allProducts, Product, Order } from '@/lib/placeholder-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getOrders, createOrder, updateOrderStatus } from '@/services/order-service';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { UserContext } from '@/context/user-context';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CategoryContext } from '@/context/category-context';

type CartItem = {
  product: Product;
  quantity: number;
};

type BillableOrder = Order & {
    source: 'quick-sale' | 'existing-order';
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
};


export default function PosPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<BillableOrder | null>(null);
  const [ordersToBill, setOrdersToBill] = useState<Order[]>([]);
  const { toast } = useToast();
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isTipPopoverOpen, setTipPopoverOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const userContext = useContext(UserContext);
  const categoryContext = useContext(CategoryContext);
  const { currentUser } = userContext!;

  const calculateTotals = (cartItems: CartItem[], tip: number = 0) => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.19;
    const total = subtotal + tax + tip;
    const profit = cartItems.reduce((sum, item) => sum + (item.product.price - item.product.cost) * item.quantity, 0);
    return { subtotal, tax, total, profit, tip };
  }

  const fetchOrdersToBill = useCallback(async () => {
    const allOrders = await getOrders();
    const filtered = allOrders.filter(o => o.status === 'Completado');
    setOrdersToBill(filtered);
  }, []);
  
  useEffect(() => {
    fetchOrdersToBill();
  }, [fetchOrdersToBill]);
  
  const createActiveOrderFromCart = (newCart: CartItem[], tip: number = 0) => {
     if (newCart.length === 0) {
        clearInvoice();
        return;
     }
     const { subtotal, tax, total, profit } = calculateTotals(newCart, tip);

      setActiveOrder({
          id: 'quick-sale',
          customerName: 'Cliente de Mostrador',
          items: newCart,
          total,
          subtotal,
          tax,
          tip,
          profit,
          status: 'Pendiente',
          createdAt: new Date().toISOString(),
          type: 'En local',
          source: 'quick-sale',
          userId: currentUser?.id,
          paymentMethod: 'Efectivo',
      });
  }

  const addToCart = (product: Product) => {
    if(activeOrder && activeOrder.source === 'existing-order') {
        toast({
            variant: 'destructive',
            title: "Pedido existente cargado",
            description: "Limpia la factura actual antes de iniciar una nueva venta rápida."
        });
        return;
    }

    const newCart = [...cart];
    const existingItem = newCart.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newCart.push({ product, quantity: 1 });
    }
    setCart(newCart);
    createActiveOrderFromCart(newCart, activeOrder?.tip || 0);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if(activeOrder?.source === 'existing-order') return; // Cannot modify existing orders

    let newCart = [...cart];
    if (quantity <= 0) {
      newCart = newCart.filter((item) => item.product.id !== productId);
    } else {
      const itemToUpdate = newCart.find((item) => item.product.id === productId);
      if(itemToUpdate) {
          itemToUpdate.quantity = quantity;
      }
    }
    setCart(newCart);
    createActiveOrderFromCart(newCart, activeOrder?.tip || 0);
  };

  // --- Start Barcode Scanner Logic ---
  useEffect(() => {
    let barcode = '';
    let barcodeTimeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (barcode.length > 3) { // Assume barcodes are longer than 3 chars
            const product = allProducts.find(p => p.sku === barcode);
            if (product) {
                addToCart(product);
                toast({
                    title: "Producto Añadido",
                    description: `${product.name} fue añadido a la factura.`,
                });
            } else {
                 toast({
                    variant: "destructive",
                    title: "Producto no encontrado",
                    description: `No se encontró ningún producto con el código: ${barcode}`,
                });
            }
        }
        barcode = '';
        return;
      }

      // Ignore special keys except numbers and letters
      if (e.key.length > 1) return;

      barcode += e.key;

      clearTimeout(barcodeTimeout);
      barcodeTimeout = setTimeout(() => {
        barcode = ''; // Reset barcode if typing is too slow
      }, 50); // 50ms timeout between keystrokes
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(barcodeTimeout);
    };
  }, [addToCart, toast]);
  // --- End Barcode Scanner Logic ---


  const loadOrderToInvoice = (order: Order) => {
      setCart([]); // Clear quick sale cart
      setActiveOrder({ ...order, source: 'existing-order' });
  };
  
  const clearInvoice = () => {
    setCart([]);
    setActiveOrder(null);
  }

  const handleOpenCashDrawer = () => {
      toast({
          title: "Abriendo Caja Registradora",
          description: "Se envió el comando para abrir la caja.",
      });
  }

  const handlePayment = async (method: 'Tarjeta' | 'Efectivo' | 'Transferencia') => {
    if(!activeOrder) return;
    
    if (activeOrder.source === 'quick-sale' && activeOrder.items.length > 0) {
         await createOrder({
            customerName: activeOrder.customerName,
            customerPhone: 'N/A',
            customerAddress: 'En local',
            items: activeOrder.items.map(i => ({ productId: i.product.id, quantity: i.quantity })),
            userId: currentUser?.id,
            tip: activeOrder.tip,
            paymentMethod: method,
            status: 'Pagado',
        });
    } else if (activeOrder.source === 'existing-order') {
        await updateOrderStatus(activeOrder.id, 'Pagado', method);
    }

    if (method === 'Efectivo') {
        handleOpenCashDrawer();
    }

    toast({
      title: "¡Venta Facturada!",
      description: `Venta de ${formatCurrency(activeOrder.total)} a ${activeOrder.customerName} procesada vía ${method}.`,
    });
    
    if (activeOrder.source === 'existing-order') {
        fetchOrdersToBill();
    }

    clearInvoice();
    setCheckoutOpen(false);
  }

  const handleAddTip = (percentage?: number, customAmount?: number) => {
      if (!activeOrder) return;

      let tipAmount = 0;
      const baseTotalForTip = activeOrder.subtotal + (activeOrder.tax || 0);

      if (customAmount && customAmount > 0) {
          tipAmount = customAmount;
      } else if (percentage) {
          tipAmount = baseTotalForTip * (percentage / 100);
      }
      
      const newTotal = baseTotalForTip + tipAmount;

      setActiveOrder({
          ...activeOrder,
          tip: tipAmount,
          total: newTotal
      });

      if (activeOrder.source === 'quick-sale') {
          createActiveOrderFromCart(cart, tipAmount);
      }
      setTipPopoverOpen(false);
  }

  const tipPercentages = [5, 10, 15, 20, 25, 30, 35, 40];
  
  const categories = categoryContext ? ['Todos', ...categoryContext.categories.map(c => c.name)] : ['Todos'];

  const filteredProducts = allProducts.filter(product => {
      if (selectedCategory === 'Todos') return true;
      return product.category === selectedCategory;
  });

  return (
    <div className="grid h-[calc(100vh-5rem)] grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Tabs defaultValue="quick-sale" className="h-full flex flex-col" onValueChange={(value) => { if(value === 'orders-to-bill') fetchOrdersToBill() }}>
            <CardHeader className='flex-row items-center justify-between'>
                <div>
                    <CardTitle>Punto de Venta</CardTitle>
                    <CardDescription>Selecciona un producto para una venta rápida o cobra un pedido existente.</CardDescription>
                </div>
                <TabsList>
                    <TabsTrigger value="quick-sale"><Utensils className="mr-2"/>Venta Rápida</TabsTrigger>
                    <TabsTrigger value="orders-to-bill">
                        <Receipt className={cn("mr-2", ordersToBill.length > 0 && "animate-blink")} />
                        Pedidos por Cobrar
                    </TabsTrigger>
                </TabsList>
            </CardHeader>
            <TabsContent value="quick-sale" className="h-full flex-1 flex flex-col">
                <Card className="h-full flex flex-col">
                    <div className="p-4 border-b">
                        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                            <TabsList className="flex flex-wrap h-auto">
                                {categories.map(cat => (
                                    <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>
                    <CardContent className="flex-1 p-0">
                        <ScrollArea className="h-[calc(100vh-18rem)]">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
                            {filteredProducts.map((product) => (
                            <Card
                                key={product.id}
                                onClick={() => addToCart(product)}
                                className="cursor-pointer transition-all hover:shadow-lg"
                            >
                                <CardContent className="p-0">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={200}
                                    height={150}
                                    className="h-24 w-full rounded-t-lg object-cover"
                                    data-ai-hint={product.imageHint}
                                />
                                </CardContent>
                                <CardFooter className="p-2 flex flex-col items-start">
                                <h3 className="text-sm font-medium">{product.name}</h3>
                                <p className="text-xs text-muted-foreground">{formatCurrency(product.price)}</p>
                                </CardFooter>
                            </Card>
                            ))}
                        </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="orders-to-bill" className="h-full flex-1">
                 <Card className="h-full">
                    <CardContent>
                        <ScrollArea className="h-[calc(100vh-14rem)]">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 p-4">
                                {ordersToBill.length > 0 ? ordersToBill.map(order => (
                                    <Card key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => loadOrderToInvoice(order)}>
                                        <CardHeader>
                                            <div className='flex justify-between items-center'>
                                                <CardTitle className="text-base">{order.id}</CardTitle>
                                                <Badge variant={'default'}>{order.status}</Badge>
                                            </div>
                                            <CardDescription>{order.customerName}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className='text-sm text-muted-foreground list-disc pl-4'>
                                               {order.items.map(item => (
                                                   <li key={item.product.id}>{item.quantity}x {item.product.name}</li>
                                               ))}
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                            <p className='font-bold w-full text-right'>{formatCurrency(order.total)}</p>
                                        </CardFooter>
                                    </Card>
                                )) : (
                                    <p className="col-span-full text-center text-muted-foreground py-10">No hay pedidos completados para cobrar.</p>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>

      <div>
        <Card className="flex h-full flex-col">
          <CardHeader>
            <CardTitle>Factura Actual</CardTitle>
            {activeOrder && <CardDescription>Pedido: {activeOrder.id} | Cliente: {activeOrder.customerName}</CardDescription>}
          </CardHeader>
          <CardContent className="flex-grow">
            <ScrollArea className="h-[calc(100vh-25rem)]">
              {!activeOrder ? (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                    <div className='text-center'>
                        <Keyboard className="h-10 w-10 mx-auto text-muted-foreground/50"/>
                        <p className='mt-2'>Escanea un código de barras o selecciona productos.</p>
                    </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeOrder.items.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                          data-ai-hint={item.product.imageHint}
                        />
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(item.product.price)}
                          </p>
                        </div>
                      </div>
                      {activeOrder.source === 'quick-sale' ? (
                        <div className="flex items-center gap-2">
                            <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                            <MinusCircle className="h-4 w-4" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                            <PlusCircle className="h-4 w-4" />
                            </Button>
                        </div>
                      ) : (
                        <div className='font-medium text-sm'>
                            x {item.quantity}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
          {activeOrder && (
            <CardFooter className="flex flex-col gap-2 border-t pt-4">
              <div className="flex w-full justify-between text-sm font-medium">
                <span>Subtotal</span>
                <span>{formatCurrency(activeOrder.subtotal)}</span>
              </div>
              <div className="flex w-full justify-between text-sm text-muted-foreground">
                <span>Impuesto (19%)</span>
                <span>{formatCurrency(activeOrder.tax)}</span>
              </div>
              <div className="flex w-full justify-between text-sm text-muted-foreground">
                <span>Propina</span>
                <span>{formatCurrency(activeOrder.tip)}</span>
              </div>
              <Separator />
              <div className="flex w-full justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(activeOrder.total)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full">
                  <Popover open={isTipPopoverOpen} onOpenChange={setTipPopoverOpen}>
                      <PopoverTrigger asChild>
                          <Button variant="outline" size="lg" disabled={!activeOrder}><HandCoins className="mr-2 h-4 w-4" />Agregar Propina</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                          <div className="grid gap-4">
                              <div className="space-y-2">
                                  <h4 className="font-medium leading-none">Añadir Propina</h4>
                                  <p className="text-sm text-muted-foreground">
                                      Selecciona un porcentaje o introduce un monto.
                                  </p>
                              </div>
                              <div className="grid grid-cols-4 gap-2">
                                  {tipPercentages.map(p => (
                                      <Button key={p} variant="secondary" onClick={() => handleAddTip(p)}>{p}%</Button>
                                  ))}
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="custom-tip">Monto Personalizado</Label>
                                <Input id="custom-tip" type="number" placeholder="Ej: 5000" onChange={(e) => handleAddTip(undefined, Number(e.target.value))} />
                              </div>
                          </div>
                      </PopoverContent>
                  </Popover>

                    <Button size="lg" variant="secondary" onClick={handleOpenCashDrawer}><Keyboard className="mr-2"/>Abrir Caja</Button>
              </div>
               <Dialog open={isCheckoutOpen} onOpenChange={setCheckoutOpen}>
                    <DialogTrigger asChild>
                       <Button size="lg" className="w-full" disabled={!activeOrder}>Facturar</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Seleccionar Método de Pago</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3">
                        <Button variant="outline" size="lg" className="h-20 flex-col gap-2" onClick={() => handlePayment('Tarjeta')}>
                          <CreditCard/> Tarjeta
                        </Button>
                         <Button variant="outline" size="lg" className="h-20 flex-col gap-2" onClick={() => handlePayment('Efectivo')}>
                          <CircleDollarSign/> Efectivo
                        </Button>
                         <Button variant="outline" size="lg" className="h-20 flex-col gap-2" onClick={() => handlePayment('Transferencia')}>
                          <Landmark/> Transferencia
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
              
              <Button variant="outline" className="w-full" onClick={clearInvoice}>
                <X className="mr-2 h-4 w-4" /> Limpiar Factura
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
```

---
---

### Archivo: `src/app/dashboard/reports/page.tsx`

```tsx
'use client';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Sector, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Order } from "@/lib/placeholder-data";
import { DateRangePicker } from "@/components/date-range-picker";
import React, { useMemo, useState, useContext, useEffect, useCallback } from "react";
import { getOrders } from "@/services/order-service";
import { UserContext } from "@/context/user-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);
};


export default function ReportsPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const userContext = useContext(UserContext);
    const users = userContext?.users || [];
    const [filteredWaiter, setFilteredWaiter] = useState('all');
    const { toast } = useToast();
    const [isPrintDialogOpen, setPrintDialogOpen] = useState(false);
    const [waiterToPrint, setWaiterToPrint] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);


    useEffect(() => {
        const fetchAndSetOrders = async () => {
            const allOrders = await getOrders();
            const paidOrders = allOrders.filter(o => o.status === 'Pagado');
            setOrders(paidOrders);
        };
        fetchAndSetOrders();
    }, []);

    const waiters = useMemo(() => 
        users.filter(u => u.role === 'Mesero' || u.role === 'Vendedor' || u.role === 'Bartender' || u.role === 'Cajero')
    , [users]);

    const employeeOptions = useMemo(() => [
        { value: 'all', label: 'Todos los Empleados' },
        ...waiters.map(user => ({ value: user.id, label: user.name }))
    ], [waiters]);


    const filteredOrders = useMemo(() => {
        if (filteredWaiter === 'all') return orders;
        return orders.filter(o => o.userId === filteredWaiter);
    }, [orders, filteredWaiter]);
    
    const totalRevenue = useMemo(() => filteredOrders.reduce((acc, order) => acc + order.total, 0), [filteredOrders]);
    const totalProfit = useMemo(() => filteredOrders.reduce((acc, order) => acc + order.profit, 0), [filteredOrders]);
    const totalTips = useMemo(() => filteredOrders.reduce((acc, order) => acc + order.tip, 0), [filteredOrders]);

    const salesByProduct = useMemo(() => {
        const productMap = new Map<string, { name: string, quantity: number, revenue: number }>();
        filteredOrders.forEach(order => {
            order.items.forEach(item => {
                const existing = productMap.get(item.product.id);
                if (existing) {
                    existing.quantity += item.quantity;
                    existing.revenue += item.product.price * item.quantity;
                } else {
                    productMap.set(item.product.id, {
                        name: item.product.name,
                        quantity: item.quantity,
                        revenue: item.product.price * item.quantity
                    });
                }
            });
        });
        return Array.from(productMap.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 10);
    }, [filteredOrders]);
    
    const tipsByWaiter = useMemo(() => {
        const waiterMap = new Map<string, { name: string, totalTips: number }>();
        filteredOrders.forEach(order => {
            if (order.userId) {
                const user = users.find(u => u.id === order.userId);
                if (user) {
                    const existing = waiterMap.get(user.id);
                    if (existing) {
                        existing.totalTips += order.tip;
                    } else {
                        waiterMap.set(user.id, { name: user.name, totalTips: order.tip });
                    }
                }
            }
        });
        return Array.from(waiterMap.values()).sort((a,b) => b.totalTips - a.totalTips);
    }, [filteredOrders, users]);

    const salesByPaymentMethod = useMemo(() => {
        const paymentMap = new Map<string, number>();
        paymentMap.set('Efectivo', 0);
        paymentMap.set('Tarjeta', 0);
        paymentMap.set('Transferencia', 0);

        filteredOrders.forEach(order => {
            const method = order.paymentMethod || 'Efectivo'; // Default a efectivo
            paymentMap.set(method, (paymentMap.get(method) || 0) + order.total);
        });
        
        return [
            { method: 'Efectivo', total: paymentMap.get('Efectivo') || 0, fill: 'var(--chart-1)' },
            { method: 'Tarjeta', total: paymentMap.get('Tarjeta') || 0, fill: 'var(--chart-2)' },
            { method: 'Transferencia', total: paymentMap.get('Transferencia') || 0, fill: 'var(--chart-3)' },
        ];
    }, [filteredOrders]);

    const chartConfig = {
      revenue: { label: "Ingresos" },
      totalTips: { label: "Propinas" },
    } satisfies import("../../../../components/ui/chart").ChartConfig;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        if (activeIndex !== index) {
            return null;
        }
        
        if (!salesByPaymentMethod[activeIndex]) return null;

        const { method, total } = salesByPaymentMethod[activeIndex];
        const totalSales = salesByPaymentMethod.reduce((acc, curr) => acc + curr.total, 0);
        const percentage = totalSales > 0 ? (total / totalSales) * 100 : 0;

        return (
            <g>
                <text x={cx} y={cy - 12} textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-sm font-semibold">
                    {method}
                </text>
                <text x={cx} y={cy + 8} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-xs">
                    {formatCurrency(total)}
                </text>
                <text x={cx} y={cy + 24} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-xs">
                    ({percentage.toFixed(1)}%)
                </text>
            </g>
        );
    };
    

    const handlePrint = (waiterId?: string) => {
        const printAction = () => {
             setTimeout(() => {
                window.print();
                toast({
                    title: "Imprimiendo Reporte",
                    description: "Se ha generado la vista de impresión para tu reporte.",
                });
             }, 100);
        }

        if (waiterId) {
            setFilteredWaiter(waiterId);
        }
        
        printAction();
    }
    
    const handlePrintIndividual = () => {
        if (!waiterToPrint) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Por favor, selecciona un empleado para imprimir el reporte.',
            });
            return;
        }
        handlePrint(waiterToPrint);
        setPrintDialogOpen(false);
    }

  return (
    <>
        <div className="flex flex-col gap-6 printable-area">
            <div className="flex items-center justify-between print-hidden">
                <div>
                     <h1 className="text-2xl font-bold tracking-tight">Reportes de Ventas</h1>
                     <p className="text-muted-foreground">Analiza el rendimiento de tu negocio a lo largo del tiempo.</p>
                </div>
                <div className="flex gap-2">
                    <DateRangePicker />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button><Printer className="mr-2"/> Imprimir Reporte</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                             <DropdownMenuLabel>Impresión General</DropdownMenuLabel>
                            <DropdownMenuItem onSelect={() => handlePrint()}>
                                Imprimir Reporte Actual
                            </DropdownMenuItem>
                             <DropdownMenuSeparator />
                             <DropdownMenuLabel>Reportes Individuales</DropdownMenuLabel>
                            <DropdownMenuItem onSelect={() => setPrintDialogOpen(true)}>
                                Imprimir por Empleado...
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Card className="print-only mb-4 border-none shadow-none">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-2">
                        <Image src="/logo.png" alt="logo" width={40} height={40}/>
                        <h1 className="text-2xl font-bold">Reporte de Ventas</h1>
                    </div>
                    <p className="text-muted-foreground">Generado el: {new Date().toLocaleDateString('es-CO')}</p>
                     {filteredWaiter !== 'all' && (
                         <p className="font-semibold">Empleado: {users.find(u => u.id === filteredWaiter)?.name}</p>
                     )}
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Resumen General</CardTitle>
                    <CardDescription>Filtra por empleado para ver su rendimiento individual.</CardDescription>
                    <div className="w-full md:w-1/4 pt-2 print-hidden">
                        <Combobox
                            options={employeeOptions}
                            value={filteredWaiter}
                            onSelect={setFilteredWaiter}
                            placeholder="Filtrar por empleado..."
                            searchPlaceholder="Buscar empleado..."
                        />
                    </div>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                     <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Ingresos Totales</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
                     </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Ganancia Total</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalProfit)}</p>
                     </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Propinas Totales</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalTips)}</p>
                     </div>
                </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                 <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Top 10 Productos Más Vendidos (por Ingresos)</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ChartContainer config={chartConfig} className="h-[350px] w-full">
                            <ResponsiveContainer>
                                <BarChart data={salesByProduct} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" tickFormatter={(value) => formatCurrency(value as number)} />
                                    <YAxis type="category" dataKey="name" width={120} tick={{fontSize: 12}} />
                                    <Tooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} cursor={{ fill: 'hsl(var(--muted))' }} />
                                    <Bar dataKey="revenue" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3 flex flex-col">
                    <CardHeader>
                        <CardTitle>Ventas por Método de Pago</CardTitle>
                        <CardDescription>Distribución de ingresos según el método de pago utilizado.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                            <ResponsiveContainer>
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel indicator="dot" />}
                                    />
                                    <Pie
                                        data={salesByPaymentMethod}
                                        dataKey="total"
                                        nameKey="method"
                                        innerRadius="60%"
                                        strokeWidth={5}
                                        activeIndex={activeIndex}
                                        onMouseOver={(_, index) => setActiveIndex(index)}
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                    >
                                       {salesByPaymentMethod.map((entry) => (
                                          <Cell
                                            key={`cell-${entry.method}`}
                                            fill={entry.fill}
                                            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                          />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm mt-4">
                         <div className="flex w-full items-center gap-2 font-medium leading-none">
                            <span className="h-2 w-2 rounded-full" style={{backgroundColor: 'var(--chart-1)'}} />
                            Efectivo <span className="ml-auto text-muted-foreground">{formatCurrency(salesByPaymentMethod.find(p => p.method === 'Efectivo')?.total || 0)}</span>
                        </div>
                        <div className="flex w-full items-center gap-2 font-medium leading-none">
                            <span className="h-2 w-2 rounded-full" style={{backgroundColor: 'var(--chart-2)'}} />
                            Tarjeta <span className="ml-auto text-muted-foreground">{formatCurrency(salesByPaymentMethod.find(p => p.method === 'Tarjeta')?.total || 0)}</span>
                        </div>
                        <div className="flex w-full items-center gap-2 font-medium leading-none">
                            <span className="h-2 w-2 rounded-full" style={{backgroundColor: 'var(--chart-3)'}} />
                            Transferencia <span className="ml-auto text-muted-foreground">{formatCurrency(salesByPaymentMethod.find(p => p.method === 'Transferencia')?.total || 0)}</span>
                        </div>
                    </CardFooter>
                </Card>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Propinas por Mesero</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                        <ChartContainer config={chartConfig} className="h-[350px] w-full">
                        <ResponsiveContainer>
                            <BarChart data={tipsByWaiter}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
                                <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} cursor={{ fill: 'hsl(var(--muted))' }} />
                                <Bar dataKey="totalTips" fill="var(--chart-1)" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Historial de Ventas</CardTitle>
                     <CardDescription>Lista detallada de todas las transacciones pagadas.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID Pedido</TableHead>
                                <TableHead>Empleado</TableHead>
                                <TableHead>Fecha</TableHead>
                                 <TableHead>Método Pago</TableHead>
                                <TableHead className="text-right">Subtotal</TableHead>
                                <TableHead className="text-right">Propina</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-right">Ganancia</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map(order => {
                                const user = users.find(u => u.id === order.userId);
                                return (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{user?.name || 'N/A'}</TableCell>
                                        <TableCell>{new Date(order.createdAt).toLocaleDateString('es-CO')}</TableCell>
                                        <TableCell>{order.paymentMethod}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(order.subtotal)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(order.tip)}</TableCell>
                                        <TableCell className="text-right font-semibold">{formatCurrency(order.total)}</TableCell>
                                        <TableCell className="text-right text-green-600">{formatCurrency(order.profit)}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .printable-area, .printable-area * {
                        visibility: visible;
                    }
                    .printable-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .print-hidden {
                        display: none;
                    }
                    .print-only {
                        display: block !important;
                    }
                    .recharts-wrapper {
                        width: 100% !important;
                    }
                }
                .print-only {
                    display: none;
                }
            `}</style>
        </div>
        
        <Dialog open={isPrintDialogOpen} onOpenChange={setPrintDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Imprimir Reporte por Empleado</DialogTitle>
                    <DialogDescription>
                        Selecciona un empleado para generar e imprimir su reporte de ventas individual.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label>Empleado</Label>
                    <Combobox
                        options={waiters.map(user => ({ value: user.id, label: user.name }))}
                        value={waiterToPrint}
                        onSelect={setWaiterToPrint}
                        placeholder="Seleccionar empleado..."
                        searchPlaceholder="Buscar empleado..."
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setPrintDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handlePrintIndividual}>Imprimir Reporte</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
}
```

---
---

### Archivo: `src/app/dashboard/settings/appearance/page.tsx`

```tsx
'use client';

import { useTheme } from '@/context/theme-context';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const colorThemes = [
    { name: 'default', label: 'Predeterminado', color: 'hsl(330, 60%, 35%)' },
    { name: 'gold', label: 'Dorado', color: 'hsl(35, 92%, 55%)' },
    { name: 'emerald', label: 'Esmeralda', color: 'hsl(142, 71%, 45%)' },
    { name: 'cobalt', label: 'Cobalto', color: 'hsl(215, 91%, 65%)' },
    { name: 'ruby', label: 'Rubí', color: 'hsl(350, 82%, 55%)' },
] as const;

type ColorThemeName = typeof colorThemes[number]['name'];

export default function AppearancePage() {
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();

  return (
    <div className="flex flex-col gap-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold tracking-tight">Apariencia</CardTitle>
          <CardDescription>Personaliza la apariencia de la aplicación. Cambia entre el modo claro y oscuro, y elige tu tema de color.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Modo de Interfaz</Label>
            <RadioGroup
              value={theme}
              onValueChange={(value: 'light' | 'dark') => setTheme(value)}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="w-full text-center py-2 bg-gray-100 text-gray-800 rounded-md">Modo Claro</div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                   <div className="w-full text-center py-2 bg-gray-900 text-gray-200 rounded-md">Modo Oscuro</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Tema de Color</Label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {colorThemes.map((ct) => (
                <div key={ct.name}>
                  <button
                    onClick={() => setColorTheme(ct.name as ColorThemeName)}
                    className={cn(
                      'flex flex-col items-center justify-center rounded-md border-2 p-3 w-full',
                      colorTheme === ct.name ? 'border-primary' : 'border-muted'
                    )}
                  >
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: ct.color }}
                    >
                      {colorTheme === ct.name && <Check className="h-5 w-5 text-white" />}
                    </div>
                    <span className="mt-2 text-xs font-medium">{ct.label}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

           <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select defaultValue="es">
                    <SelectTrigger className="w-[280px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">Inglés (English)</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                    Selecciona el idioma de la interfaz.
                </p>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
```

---
---

### Archivo: `src/app/dashboard/settings/general/page.tsx`

```tsx
'use client';
import { useContext, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image as ImageIcon, Square, Circle, RectangleHorizontal } from "lucide-react";
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { BusinessContext } from '@/context/business-context';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import type { LogoShape } from '@/context/business-context';


export default function GeneralSettingsPage() {
    const { toast } = useToast();
    const context = useContext(BusinessContext);
    
    if (!context) {
        throw new Error("BusinessContext must be used within a BusinessProvider");
    }

    const { businessInfo, setBusinessInfo } = context;
    const [logoZoom, setLogoZoom] = useState(businessInfo.logoZoom || 1);
    const [logoShape, setLogoShape] = useState<LogoShape>(businessInfo.logoShape || 'square');
    const [logoSize, setLogoSize] = useState(businessInfo.logoSize || 24);
    const [headlineFontSize, setHeadlineFontSize] = useState(businessInfo.headlineFontSize || 20);


     useEffect(() => {
        setLogoZoom(businessInfo.logoZoom || 1);
        setLogoShape(businessInfo.logoShape || 'square');
        setLogoSize(businessInfo.logoSize || 24);
        setHeadlineFontSize(businessInfo.headlineFontSize || 20);
    }, [businessInfo.logoZoom, businessInfo.logoShape, businessInfo.logoSize, businessInfo.headlineFontSize]);


    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setBusinessInfo({ ...businessInfo, logo: reader.result as string, logoZoom: 1 });
                setLogoZoom(1);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSaveChanges = () => {
        const nameInput = document.getElementById('business-name') as HTMLInputElement;
        const addressInput = document.getElementById('address') as HTMLInputElement;
        
        setBusinessInfo({
            ...businessInfo,
            name: nameInput.value,
            address: addressInput.value,
            logoZoom: logoZoom,
            logoShape: logoShape,
            logoSize: logoSize,
            headlineFontSize: headlineFontSize,
        });

        toast({
            title: "¡Éxito!",
            description: "La información del negocio ha sido guardada.",
        });
    }

    const handleSaveRegionalChanges = () => {
        toast({
            title: "¡Éxito!",
            description: "La configuración regional ha sido guardada.",
        });
    }

    const logoShapeClasses: Record<LogoShape, string> = {
        square: 'rounded-none',
        rounded: 'rounded-md',
        circle: 'rounded-full',
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="font-bold tracking-tight">Información del Negocio</CardTitle>
                    <CardDescription>Actualiza los datos de tu empresa.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="business-name">Nombre del Negocio</Label>
                        <Input id="business-name" defaultValue={businessInfo.name} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="headline-font-size">Tamaño de la Fuente del Nombre ({headlineFontSize}px)</Label>
                        <Slider
                            id="headline-font-size"
                            min={14}
                            max={32}
                            step={1}
                            value={[headlineFontSize]}
                            onValueChange={(value) => setHeadlineFontSize(value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input id="address" defaultValue={businessInfo.address} />
                    </div>
                    <div className="space-y-2">
                        <Label>Logo</Label>
                         <div className="flex items-center gap-4">
                            <div className={cn(
                                "flex h-24 w-24 items-center justify-center border bg-muted overflow-hidden",
                                logoShapeClasses[logoShape]
                            )}>
                                {businessInfo.logo ? (
                                    <Image 
                                      src={businessInfo.logo} 
                                      alt="Logo del negocio" 
                                      width={96} 
                                      height={96} 
                                      className="object-cover w-full h-full"
                                      style={{ transform: `scale(${logoZoom})` }}
                                    />
                                ) : (
                                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                                )}
                            </div>
                            <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>Subir Logo</Button>
                        </div>
                         <input
                            type="file"
                            id="logo-upload"
                            onChange={handleLogoUpload}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                     <div className="space-y-2">
                        <Label>Forma del Logo</Label>
                        <RadioGroup
                            value={logoShape}
                            onValueChange={(value: LogoShape) => setLogoShape(value)}
                            className="grid grid-cols-3 gap-4"
                        >
                            <Label htmlFor="shape-square" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                <RadioGroupItem value="square" id="shape-square" className="peer sr-only" />
                                <Square className="mb-2 h-6 w-6"/>
                                Cuadrado
                            </Label>
                            <Label htmlFor="shape-rounded" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                <RadioGroupItem value="rounded" id="shape-rounded" className="peer sr-only" />
                                <RectangleHorizontal className="mb-2 h-6 w-6"/>
                                Redondeado
                            </Label>
                            <Label htmlFor="shape-circle" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                <RadioGroupItem value="circle" id="shape-circle" className="peer sr-only" />
                                <Circle className="mb-2 h-6 w-6"/>
                                Circular
                            </Label>
                        </RadioGroup>
                    </div>
                    {businessInfo.logo && (
                        <div className="space-y-4 pt-2">
                           <div className="space-y-2">
                                <Label htmlFor="logo-size">Tamaño del Contenedor del Logo ({logoSize}px)</Label>
                                <Slider
                                    id="logo-size"
                                    min={20}
                                    max={62}
                                    step={1}
                                    value={[logoSize]}
                                    onValueChange={(value) => setLogoSize(value[0])}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="logo-zoom">Zoom del Logo</Label>
                                <Slider
                                    id="logo-zoom"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={[logoZoom]}
                                    onValueChange={(value) => setLogoZoom(value[0])}
                                />
                            </div>
                        </div>
                    )}
                     <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-bold tracking-tight">Configuración Regional</CardTitle>
                    <CardDescription>Define el idioma, la moneda y la zona horaria para tu negocio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <Select defaultValue="es">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="en">Inglés</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="currency">Moneda</Label>
                        <Select defaultValue="COP">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="COP">Peso Colombiano (COP)</SelectItem>
                                <SelectItem value="USD">Dólar Estadounidense (USD)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timezone">Zona Horaria</Label>
                        <Select defaultValue="America/Bogota">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="America/Bogota">Bogotá, Lima, Quito (GMT-5)</SelectItem>
                                <SelectItem value="America/New_York">Hora del Este (GMT-4)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleSaveRegionalChanges}>Guardar Cambios</Button>
                </CardContent>
            </Card>
        </div>
    );
}
```

---
---

### Archivo: `src/app/dashboard/settings/hardware/page.tsx`

```tsx
'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer, PlusCircle, MoreHorizontal, ScanLine, Archive, Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';


type Printer = {
    id: string;
    name: string;
    ip: string;
    type: string;
};

const initialPrinters: Printer[] = [
    {
        id: 'printer_1',
        name: "Cocina",
        ip: "192.168.1.100",
        type: "Térmica 80mm"
    },
    {
        id: 'printer_2',
        name: "Barra",
        ip: "192.168.1.101",
        type: "Térmica 58mm"
    }
]

export default function HardwarePage() {
    const [printers, setPrinters] = useState(initialPrinters);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingPrinter, setEditingPrinter] = useState<Printer | null>(null);
    const { toast } = useToast();

    const handleAddPrinter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newPrinter: Printer = {
            id: `printer_${Date.now()}`,
            name: formData.get('name') as string,
            ip: formData.get('ip') as string,
            type: formData.get('type') as string,
        };
        setPrinters([...printers, newPrinter]);
        setIsAddDialogOpen(false);
    };

    const handleEditPrinter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingPrinter) return;

        const formData = new FormData(e.currentTarget);
        const updatedPrinter = {
            ...editingPrinter,
            name: formData.get('name') as string,
            ip: formData.get('ip') as string,
            type: formData.get('type') as string,
        };
        setPrinters(printers.map(p => p.id === updatedPrinter.id ? updatedPrinter : p));
        setEditingPrinter(null);
    };

    const handleDeletePrinter = (id: string) => {
        setPrinters(printers.filter(p => p.id !== id));
    };

    const handleOpenCashDrawer = () => {
        toast({
            title: "Abriendo Caja Registradora",
            description: "Se envió el comando para abrir la caja.",
        });
    }

    return (
        <>
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-bold tracking-tight">Impresoras</CardTitle>
                            <CardDescription>Gestiona las impresoras para comandas y recibos.</CardDescription>
                        </div>
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Agregar Impresora
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Agregar Nueva Impresora</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleAddPrinter}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nombre</Label>
                                            <Input id="name" name="name" required />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="ip">Dirección IP</Label>
                                            <Input id="ip" name="ip" required />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="type">Tipo</Label>
                                            <Input id="type" name="type" placeholder="Ej: Térmica 80mm" required />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                                        <Button type="submit">Agregar Impresora</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Dirección IP</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead><span className="sr-only">Acciones</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {printers.map((printer) => (
                                    <TableRow key={printer.id}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            <Printer className="h-4 w-4 text-muted-foreground" /> {printer.name}
                                        </TableCell>
                                        <TableCell>{printer.ip}</TableCell>
                                        <TableCell>{printer.type}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => setEditingPrinter(printer)}>Editar</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDeletePrinter(printer.id)}>Eliminar</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                         <CardTitle className="font-bold tracking-tight">Lectores de Códigos de Barras</CardTitle>
                        <CardDescription>Configura y gestiona los lectores de códigos de barras.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="scanner-timeout">Tiempo de Espera del Escáner (ms)</Label>
                            <Input id="scanner-timeout" type="number" defaultValue="50" />
                             <p className="text-sm text-muted-foreground">
                                Tiempo máximo entre pulsaciones para ser considerado una lectura de código de barras.
                            </p>
                        </div>
                        <div className="space-y-2">
                             <Label>Dispositivos Conectados</Label>
                             <div className="rounded-md border p-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ScanLine className="h-5 w-5 text-muted-foreground"/>
                                    <div>
                                        <p className="font-medium">Lector Láser Genérico</p>
                                        <p className="text-xs text-green-600">Conectado</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Probar</Button>
                             </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                         <CardTitle className="font-bold tracking-tight">Caja Registradora</CardTitle>
                        <CardDescription>Configura la apertura de la caja de dinero en efectivo.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="cash-drawer-interface">Interfaz de Conexión</Label>
                                <Select defaultValue="printer">
                                    <SelectTrigger id="cash-drawer-interface">
                                        <SelectValue placeholder="Seleccionar interfaz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="printer">Conectada a la Impresora de Recibos</SelectItem>
                                        <SelectItem value="usb">USB</SelectItem>
                                        <SelectItem value="serial">Puerto Serial (RS232)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleOpenCashDrawer}><Play className="mr-2"/> Probar Apertura de Caja</Button>
                        </div>

                         <div className="flex items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-8">
                             <div className="text-center">
                                <Archive className="mx-auto h-12 w-12 text-muted-foreground"/>
                                <p className="mt-2 text-sm font-medium text-muted-foreground">La caja se abrirá automáticamente al finalizar una venta en efectivo.</p>
                             </div>
                         </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={!!editingPrinter} onOpenChange={(isOpen) => !isOpen && setEditingPrinter(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Impresora</DialogTitle>
                    </DialogHeader>
                     <form onSubmit={handleEditPrinter}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Nombre</Label>
                                <Input id="edit-name" name="name" defaultValue={editingPrinter?.name} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-ip">Dirección IP</Label>
                                <Input id="edit-ip" name="ip" defaultValue={editingPrinter?.ip} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-type">Tipo</Label>
                                <Input id="edit-type" name="type" defaultValue={editingPrinter?.type} required />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditingPrinter(null)}>Cancelar</Button>
                            <Button type="submit">Guardar Cambios</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
```

---
---

### Archivo: `src/app/dashboard/settings/layout.tsx`

```tsx
'use client';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRootSettings = pathname === '/dashboard/settings';

  return (
    <div className="flex flex-col gap-8 w-full">
        {!isRootSettings && (
            <div className="mb-4">
                <Button variant="ghost" asChild className="justify-start">
                     <Link href="/dashboard/settings">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a Configuración
                    </Link>
                </Button>
            </div>
        )}
        <main className="w-full">
            {children}
        </main>
    </div>
  );
}
```

---
---

### Archivo: `src/app/dashboard/settings/page.tsx`

```tsx
'use client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Palette, Users, HardHat, Package, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const settingsCategories = [
    {
        href: '/dashboard/settings/general',
        title: 'General',
        description: 'Configura los datos de tu negocio, logo y la información regional.',
        icon: Briefcase,
    },
    {
        href: '/dashboard/settings/users',
        title: 'Usuarios',
        description: 'Gestiona los usuarios y sus roles en el sistema.',
        icon: Users,
    },
    {
        href: '/dashboard/settings/appearance',
        title: 'Apariencia',
        description: 'Personaliza el tema, los colores y el idioma de la aplicación.',
        icon: Palette,
    },
     {
        href: '/dashboard/settings/hardware',
        title: 'Hardware',
        description: 'Conecta y configura impresoras y cajas registradoras.',
        icon: HardHat,
    },
    {
        href: '/dashboard/integrations',
        title: 'Integraciones',
        description: 'Sincroniza con plataformas de delivery y otros servicios.',
        icon: Package,
    },
    {
        href: '/dashboard/settings/payment-methods',
        title: 'Métodos de Pago',
        description: 'Activa o desactiva los métodos de pago disponibles.',
        icon: CreditCard,
    }
];


export default function SettingsPage() {
    const pathname = usePathname();
    const isRootSettings = pathname === '/dashboard/settings';

    if (!isRootSettings) return null;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
                <p className="text-muted-foreground">Administra la configuración de tu negocio y la aplicación.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {settingsCategories.map((category) => (
                    <Link href={category.href} key={category.title}>
                        <Card className="h-full hover:bg-muted/50 transition-colors group">
                            <CardHeader>
                                 <div className='flex items-center gap-4'>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <category.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-semibold">{category.title}</CardTitle>
                                        <CardDescription className="text-xs">{category.description}</CardDescription>
                                    </div>
                                 </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
```

---
---

### Archivo: `src/app/dashboard/settings/payment-methods/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Landmark, CreditCard, CircleDollarSign } from 'lucide-react';

const paymentMethods = [
    {
        id: 'efectivo',
        name: 'Efectivo',
        description: 'Aceptar pagos en efectivo en el punto de venta.',
        icon: <CircleDollarSign className="h-6 w-6" />,
    },
    {
        id: 'tarjeta',
        name: 'Tarjeta de Crédito/Débito',
        description: 'Procesar pagos con tarjetas a través de un datáfono.',
        icon: <CreditCard className="h-6 w-6" />,
    },
    {
        id: 'transferencia',
        name: 'Transferencia Bancaria',
        description: 'Aceptar pagos a través de transferencias bancarias.',
        icon: <Landmark className="h-6 w-6" />,
    }
];

export default function PaymentMethodsPage() {
    const [methodsState, setMethodsState] = useState({
        efectivo: true,
        tarjeta: true,
        transferencia: true,
    });
    const { toast } = useToast();

    const handleToggle = (methodId: keyof typeof methodsState) => {
        setMethodsState(prev => ({ ...prev, [methodId]: !prev[methodId] }));
    };

    const handleSaveChanges = () => {
        toast({
            title: "Configuración Guardada",
            description: "Los métodos de pago han sido actualizados.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-bold tracking-tight">Métodos de Pago</CardTitle>
                <CardDescription>
                    Activa o desactiva los métodos de pago que ofreces a tus clientes.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {paymentMethods.map(method => (
                    <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                {method.icon}
                            </div>
                            <div>
                                <Label htmlFor={method.id} className="text-base font-semibold">{method.name}</Label>
                                <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                        </div>
                        <Switch
                            id={method.id}
                            checked={methodsState[method.id as keyof typeof methodsState]}
                            onCheckedChange={() => handleToggle(method.id as keyof typeof methodsState)}
                        />
                    </div>
                ))}

                 <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
                </div>
            </CardContent>
        </Card>
    );
}
```

---
---

### Archivo: `src/app/dashboard/settings/users/page.tsx`

```tsx
'use client';
import { useState, useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserContext } from "@/context/user-context";
import { User, UserRole } from '@/lib/placeholder-data';
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { defaultAvatars, renderAvatar } from '@/lib/user-avatar';


const getRoleBadgeVariant = (role: UserRole): "default" | "secondary" | "outline" | "destructive" | "success" | "info" => {
    switch (role) {
        case 'Administrador':
            return 'default';
        case 'Mesero':
        case 'Vendedor':
            return 'info';
        case 'Bartender':
        case 'Cajero':
            return 'success';
        default:
            return 'secondary';
    }
};

export default function UserManagementPage() {
    const userContext = useContext(UserContext);
    
    if (!userContext) {
        throw new Error("UserManagementPage must be used within a UserProvider");
    }

    const { users, setUsers } = userContext;
    const [isAddOpen, setAddOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isAvatarDialogOpen, setAvatarDialogOpen] = useState(false);
    const [avatarZoom, setAvatarZoom] = useState(1);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newUser: User = {
            id: `user_${Date.now()}`,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            role: formData.get('role') as UserRole,
            avatarUrl: 'default:smile-icon',
            status: 'Activo',
            avatarZoom: 1
        };
        setUsers([newUser, ...users]);
        setAddOpen(false);
    };

    const handleEditUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingUser) return;
        const formData = new FormData(e.currentTarget);
        const updatedUser = {
            ...editingUser,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            role: formData.get('role') as UserRole,
        };
        setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
        setEditingUser(null);
        setIsEditDialogOpen(false);
    };

    const handleDeleteUser = (userId: string) => {
        setUsers(users.filter(u => u.id !== userId));
    };

    const handleToggleStatus = (userId: string) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'Activo' ? 'Inactivo' : 'Activo' } : u));
    };
    
    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0] && editingUser) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditingUser({ ...editingUser, avatarUrl: reader.result as string, avatarZoom: 1 });
                setAvatarZoom(1);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSelectDefaultAvatar = (avatar: { id: string, icon: React.ReactNode }) => {
        if (editingUser) {
             const avatarIdentifier = `default:${avatar.id}`;
             setEditingUser({ ...editingUser, avatarUrl: avatarIdentifier, avatarZoom: 1 });
             setAvatarZoom(1);
        }
    };
    
    const handleZoomChange = (value: number[]) => {
       setAvatarZoom(value[0]);
    }

    const handleAvatarDialogSave = () => {
        if(editingUser) {
            const updatedUser = {...editingUser, avatarZoom: avatarZoom };
            setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
        }
        setAvatarDialogOpen(false);
        setEditingUser(null);
        setIsEditDialogOpen(false);
    }
    
    const handleOpenEditDialog = (user: User) => {
        setEditingUser(user);
        setAvatarZoom(user.avatarZoom || 1);
        setIsEditDialogOpen(true);
    }

    const handleCloseEditDialog = () => {
        setEditingUser(null);
        setAvatarZoom(1);
        setIsEditDialogOpen(false);
    }
    
    const handleOpenAvatarDialog = () => {
        if(editingUser){
            setAvatarZoom(editingUser.avatarZoom || 1);
            setAvatarDialogOpen(true);
        }
    }

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-bold tracking-tight">Gestión de Usuarios</CardTitle>
                        <CardDescription>
                            Gestiona las cuentas de usuario y sus roles en el sistema.
                        </CardDescription>
                    </div>
                    <Dialog open={isAddOpen} onOpenChange={setAddOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" /> Agregar Usuario
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddUser}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="add-name">Nombre Completo</Label>
                                        <Input id="add-name" name="name" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Correo Electrónico</Label>
                                        <Input id="email" name="email" type="email" placeholder="nombre@ejemplo.com" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Input id="password" name="password" type="password" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="role">Rol</Label>
                                        <Select name="role" required defaultValue="Mesero">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un rol" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Administrador">Administrador</SelectItem>
                                                <SelectItem value="Mesero">Mesero</SelectItem>
                                                <SelectItem value="Vendedor">Vendedor</SelectItem>
                                                <SelectItem value="Bartender">Bartender</SelectItem>
                                                <SelectItem value="Cajero">Cajero</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                     <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>Cancelar</Button>
                                     <Button type="submit">Agregar Usuario</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Rol</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>
                                    <span className="sr-only">Acciones</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {renderAvatar(user)}
                                            <div className="grid gap-0.5">
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getRoleBadgeVariant(user.role)}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`${user.status === 'Activo' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} `}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleOpenEditDialog(user)}>Editar</DropdownMenuItem>
                                                {user.status === 'Activo' ? (
                                                    <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>Desactivar</DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>Activar</DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>Eliminar</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isEditDialogOpen} onOpenChange={handleCloseEditDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Usuario</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditUser}>
                        <div className="grid gap-4 py-4">
                             <div className="space-y-2">
                                <Label>Avatar</Label>
                                <div className="flex items-center gap-4">
                                     {editingUser && renderAvatar(editingUser, true)}
                                    <Button type="button" variant="outline" onClick={handleOpenAvatarDialog}>Cambiar Avatar</Button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Nombre</Label>
                                <Input id="edit-name" name="name" defaultValue={editingUser?.name} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-email">Correo Electrónico</Label>
                                <Input id="edit-email" name="email" type="email" defaultValue={editingUser?.email} required />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="edit-password">Nueva Contraseña (opcional)</Label>
                                <Input id="edit-password" name="password" type="password" placeholder="Dejar en blanco para no cambiar" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-role">Rol</Label>
                                <Select name="role" required defaultValue={editingUser?.role}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Administrador">Administrador</SelectItem>
                                        <SelectItem value="Mesero">Mesero</SelectItem>
                                        <SelectItem value="Vendedor">Vendedor</SelectItem>
                                        <SelectItem value="Bartender">Bartender</SelectItem>
                                        <SelectItem value="Cajero">Cajero</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={handleCloseEditDialog}>Cancelar</Button>
                            <Button type="submit">Guardar Cambios</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

             <Dialog open={isAvatarDialogOpen} onOpenChange={setAvatarDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Seleccionar un Avatar</DialogTitle>
                        <DialogDescription>
                            Elige un avatar predeterminado o sube tu propia imagen.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-6">
                        <div className='flex justify-center'>
                           <div className="w-32 h-32 rounded-full overflow-hidden border-2 flex items-center justify-center">
                               {editingUser?.avatarUrl && !editingUser.avatarUrl.startsWith('default:') ? (
                                    <Image 
                                        src={editingUser.avatarUrl} 
                                        alt="Avatar Preview" 
                                        width={128} 
                                        height={128} 
                                        className="object-cover w-full h-full"
                                        style={{ transform: `scale(${avatarZoom})` }}
                                    />
                               ): (
                                <div className='flex items-center justify-center w-full h-full bg-muted'>
                                    {editingUser?.avatarUrl && defaultAvatars.find(a => a.id === editingUser.avatarUrl.split(':')[1])?.icon}
                                </div>
                               )}
                           </div>
                        </div>

                         {editingUser?.avatarUrl && !editingUser.avatarUrl.startsWith('default:') && (
                            <div className="grid gap-2">
                                <Label htmlFor="avatar-zoom">Zoom</Label>
                                <Slider
                                    id="avatar-zoom"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={[avatarZoom]}
                                    onValueChange={handleZoomChange}
                                />
                            </div>
                         )}

                        <div>
                            <h4 className="mb-4 text-sm font-medium">Avatares Predeterminados</h4>
                            <div className="grid grid-cols-4 gap-4">
                                {defaultAvatars.map((avatar) => (
                                    <Button key={avatar.id} type="button" variant="outline" className="h-20 w-20" onClick={() => handleSelectDefaultAvatar(avatar)}>
                                        {avatar.icon}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                             <h4 className="mb-2 text-sm font-medium">Subir Imagen</h4>
                             <Input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarUpload} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setAvatarDialogOpen(false)}>Cancelar</Button>
                        <Button type="button" onClick={handleAvatarDialogSave}>Guardar Avatar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
```

---
---

### Archivo: `src/app/dashboard/whatsapp/actions.ts`

```ts
'use server';

import { whatsAppOrder, WhatsAppOrderInput } from '@/ai/flows/whatsapp-order';
import { products } from '@/lib/placeholder-data';

type Message = {
    role: 'user' | 'model';
    content: string;
};

export async function getWhatsAppResponse(customerMessage: string, businessName: string, conversationHistory: Message[]) {
  try {
    const currentStock = products.map(p => `ID: ${p.id}, Name: ${p.name}, Stock: ${p.stock} units`).join('\n');
    
    const input: WhatsAppOrderInput = {
      customerMessage,
      currentStock,
      businessName,
      conversationHistory,
    };
    
    const result = await whatsAppOrder(input);

    return {
      message: 'success',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while getting a response from the AI agent.',
      data: null
    };
  }
}
```

---
---

### Archivo: `src/app/dashboard/whatsapp/components/ai-training-tab.tsx`

```tsx
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bot } from "lucide-react";

export function AiTrainingTab() {
    const { toast } = useToast();

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send the data to a backend to update the AI model's prompt/configuration.
        toast({
            title: "Configuración Guardada",
            description: "El asistente de IA ha sido actualizado con la nueva información.",
        });
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-3">
                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Bot className="h-5 w-5" />
                    </div>
                    <div>
                        <CardTitle className="font-bold tracking-tight">Entrenamiento del Asistente de IA</CardTitle>
                        <CardDescription>Nutre a la IA con información específica de tu negocio y personaliza su comportamiento.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <form onSubmit={handleSaveChanges} className="space-y-6">
                    <div>
                        <Label htmlFor="business-context" className="text-lg font-semibold">Contexto del Negocio</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                            Describe tu negocio. Incluye la historia, tipo de comida, horarios, dirección, promociones actuales, etc. Esta información será el "cerebro" de la IA.
                        </p>
                        <Textarea
                            id="business-context"
                            placeholder="Ej: Somos un restaurante familiar de comida colombiana fundado en 1990. Nuestro plato estrella es la Bandeja Paisa. Abrimos de 8am a 10pm. Este mes tenemos 2x1 en jugos naturales..."
                            className="min-h-[150px]"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Personalización de la Conversación</h3>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="greeting">Saludo Inicial</Label>
                                <Textarea id="greeting" placeholder="¡Hola! Soy el asistente virtual de [Nombre del Negocio]. ¿Te gustaría hacer un nuevo pedido o consultar el estado de uno existente?" />
                            </div>
                            <div>
                                <Label htmlFor="faq">Respuestas a Preguntas Frecuentes (FAQ)</Label>
                                <Textarea id="faq" placeholder="Pregunta: ¿Tienen opciones vegetarianas? Respuesta: ¡Claro! Nuestra Arepa de Huevo puede prepararse con champiñones en vez de carne." className="min-h-[100px]" />
                            </div>
                            <div>
                                <Label htmlFor="farewell">Despedida Estándar</Label>
                                <Textarea id="farewell" placeholder="¡Gracias por preferirnos! Tu pedido está en marcha. ¡Buen provecho!" />
                            </div>
                        </div>
                    </div>
                     <div className="flex justify-end">
                        <Button type="submit">Guardar Cambios en IA</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
```

---
---

### Archivo: `src/app/dashboard/whatsapp/components/live-chats-tab.tsx`

```tsx
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LiveChatsTab = () => {
    const liveChats = [
        { id: 1, name: "Maria Rodriguez", lastMessage: "¡Gracias! Todo perfecto.", time: "10:45 AM", unread: 0, avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, name: "Carlos Gomez", lastMessage: "Hola, ¿puedo cambiar mi pedido?", time: "10:42 AM", unread: 2, avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: 3, name: "Ana Perez", lastMessage: "Mi dirección es Calle 123.", time: "Ayer", unread: 0, avatar: 'https://i.pravatar.cc/150?img=3' },
    ];
    const [selectedChat, setSelectedChat] = React.useState(liveChats[1]);
    const chatMessages = [
        { sender: 'user', text: 'Hola, ¿puedo cambiar mi pedido?', time: '10:40 AM' },
        { sender: 'agent', text: '¡Claro! ¿Qué te gustaría cambiar?', time: '10:41 AM' },
        { sender: 'user', text: 'Quisiera agregar una empanada de carne.', time: '10:42 AM' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
            <Card className="md:col-span-1 flex flex-col">
                <CardHeader>
                    <CardTitle>Chats Activos</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                    <ScrollArea className="h-full">
                        {liveChats.map(chat => (
                            <div key={chat.id} className={cn("flex items-center gap-3 p-3 cursor-pointer border-b", selectedChat.id === chat.id ? 'bg-muted' : 'hover:bg-muted/50')} onClick={() => setSelectedChat(chat)}>
                                <Avatar>
                                    <AvatarImage src={chat.avatar} />
                                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 truncate">
                                    <p className="font-semibold truncate">{chat.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground">{chat.time}</p>
                                    {chat.unread > 0 && <span className="flex items-center justify-center text-xs text-white bg-green-500 rounded-full w-5 h-5">{chat.unread}</span>}
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
            <Card className="md:col-span-3 flex flex-col">
                <CardHeader className="flex-row items-center gap-3">
                     <Avatar>
                        <AvatarImage src={selectedChat.avatar} />
                        <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="font-bold tracking-tight">{selectedChat.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">En línea</p>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 bg-muted/30 p-4">
                     <ScrollArea className="h-full">
                        <div className="space-y-4">
                            {chatMessages.map((msg, index) => (
                                <div key={index} className={cn("flex items-end gap-2 max-w-md", msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto')}>
                                    <div className={cn("rounded-lg p-3 text-sm", msg.sender === 'user' ? "rounded-br-none bg-primary text-primary-foreground" : "rounded-bl-none bg-background")}>
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <form className="flex items-center gap-2 border-t p-4">
                    <Input placeholder={`Responder a ${selectedChat.name}...`} />
                    <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </Card>
        </div>
    )
}
```

---
---

### Archivo: `src/app/dashboard/whatsapp/page.tsx`

```tsx
'use client';
import React, { useContext } from 'react';
import { Send, Bot, User, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChatBubble } from '@/components/ui/chat-bubble';
import { getWhatsAppResponse } from './actions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BusinessContext } from '@/context/business-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { UserContext } from '@/context/user-context';
import { AiTrainingTab } from './components/ai-training-tab';
import { LiveChatsTab } from './components/live-chats-tab';


type Message = {
    sender: 'user' | 'agent';
    text: string;
};

type FlowMessage = {
    role: 'user' | 'model';
    content: string;
}

const AiAgentTab = () => {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);
    const context = useContext(BusinessContext);

    if (!context) {
        throw new Error("BusinessContext must be used within a BusinessProvider");
    }
    const { businessInfo } = context;

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { sender: 'user', text: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        const conversationHistory: FlowMessage[] = updatedMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            content: msg.text,
        }));

        const response = await getWhatsAppResponse(input, businessInfo.name, conversationHistory);
        setIsLoading(false);

        if (response.message === 'success' && response.data) {
            const agentMessage: Message = { sender: 'agent', text: response.data.response };
            setMessages(prev => [...prev, agentMessage]);
        } else {
            const errorMessage: Message = { sender: 'agent', text: "Lo siento, estoy teniendo problemas para conectarme. Por favor, inténtalo de nuevo más tarde." };
            setMessages(prev => [...prev, errorMessage]);
        }
    };
    
    React.useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isLoading]);

    return (
        <Card className="flex-1 flex flex-col">
            <CardHeader className="flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback className="bg-green-500 text-white"><Bot /></AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="font-bold tracking-tight">Simulador de Agente IA</CardTitle>
                        <p className="text-sm text-muted-foreground">Prueba y entrena el flujo de conversación del bot.</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden p-0">
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <ChatBubble key={index} sender={msg.sender} message={msg.text} />
                        ))}
                        {isLoading && <ChatBubble sender="agent" isLoading />}
                    </div>
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t p-4">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe tu pedido aquí..."
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default function WhatsAppPage() {
    const userContext = useContext(UserContext);
    const isAdmin = userContext?.currentUser?.role === 'Administrador';

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
            <Tabs defaultValue="simulation" className="flex-1 flex flex-col">
                <TabsList className={cn("w-full grid", isAdmin ? "grid-cols-3" : "grid-cols-2")}>
                    <TabsTrigger value="simulation">
                        <Bot className="mr-2" /> Agente de Pruebas
                    </TabsTrigger>
                    <TabsTrigger value="live">
                        <User className="mr-2" /> Chats en Vivo
                    </TabsTrigger>
                    {isAdmin && (
                        <TabsTrigger value="training">
                            <BrainCircuit className="mr-2" /> Entrenamiento de IA
                        </TabsTrigger>
                    )}
                </TabsList>
                <TabsContent value="simulation" className="flex-1 mt-4">
                    <AiAgentTab />
                </TabsContent>
                <TabsContent value="live" className="flex-1 mt-4">
                    <LiveChatsTab />
                </TabsContent>
                 {isAdmin && (
                    <TabsContent value="training" className="flex-1 mt-4">
                        <AiTrainingTab />
                    </TabsContent>
                 )}
            </Tabs>
        </div>
    );
}
```

---
---

### Archivo: `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --radius: 0.5rem;

    /* Default Theme (Primary/Accent) */
    --primary: 330 60% 35%;
    --primary-foreground: 0 0% 98%;
    --accent: 330 60% 35%;
    --accent-foreground: 0 0% 98%;
    --ring: 330 60% 45%;

    --chart-1: hsl(var(--primary));
    --chart-2: hsl(var(--primary) / 0.75);
    --chart-3: hsl(var(--primary) / 0.5);
    --chart-4: hsl(var(--primary) / 0.25);
    --chart-5: hsl(var(--primary) / 0.1);
  }

  .dark {
    --background: 0 0% 8%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer utilities {
    .animate-blink {
        animation: blink 1.5s infinite;
    }

    @keyframes blink {
        0%, 100% {
            color: hsl(var(--muted-foreground));
        }
        50% {
            color: #22c55e; /* green-500 */
        }
    }
    
    .login-gradient {
        background: radial-gradient(ellipse at top, #1b2735 0%, #090a0f 100%);
    }

    .dark .login-gradient {
        background: radial-gradient(ellipse at top, #1b2735 0%, #090a0f 100%);
    }
}
```

---
---

### Archivo: `src/app/layout.tsx`

```tsx
'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/user-context";
import { BusinessProvider } from "@/context/business-context";
import { ThemeProvider } from "@/context/theme-context";
import { CategoryProvider } from "@/context/category-context";
import { ReactNode } from 'react';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <BusinessProvider>
            <CategoryProvider>
              <UserProvider>
                  {children}
                  <Toaster />
              </UserProvider>
            </CategoryProvider>
          </BusinessProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---
---

### Archivo: `src/app/login/page.tsx`

```tsx
'use client';

import React, { useState, useContext, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserContext } from '@/context/user-context';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Lock, Loader2 } from 'lucide-react';


const WavyBackground = () => (
    <>
        <svg
            className="absolute top-0 left-0 w-1/2 h-auto text-white/5 pointer-events-none"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M 0 800 Q 200 600 400 800 T 800 600 V 0 H 0 Z"
                fill="currentColor"
                opacity="0.1"
            />
             <path
                d="M 0 700 Q 150 550 300 700 T 600 550 T 900 700 V 0 H 0 Z"
                fill="currentColor"
                 opacity="0.1"
            />
        </svg>
        <svg
            className="absolute bottom-0 right-0 w-1/2 h-auto text-white/5 pointer-events-none"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M 800 0 Q 600 200 400 0 T 0 200 V 800 H 800 Z"
                fill="currentColor"
                 opacity="0.1"
            />
             <path
                d="M 800 100 Q 650 250 500 100 T 200 250 T -100 100 V 800 H 800 Z"
                fill="currentColor"
                 opacity="0.1"
            />
        </svg>
    </>
);


export default function LoginPage() {
    const [email, setEmail] = useState('admin@commerceflow.com');
    const [password, setPassword] = useState('password123');
    const [isLoading, setIsLoading] = useState(false);
    const userContext = useContext(UserContext);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (userContext?.currentUser) {
            router.push('/dashboard');
        }
    }, [userContext?.currentUser, router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            if (userContext?.handleLogin) {
                const loginSuccess = userContext.handleLogin(email, password);
                if (loginSuccess) {
                    toast({
                        title: '¡Bienvenido de nuevo!',
                        description: 'Has iniciado sesión correctamente.',
                    });
                    router.push('/dashboard');
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Error de autenticación',
                        description: 'El correo electrónico o la contraseña son incorrectos.',
                    });
                    setIsLoading(false);
                }
            } else {
                 toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'El servicio de autenticación no está disponible.',
                });
                setIsLoading(false);
            }
        }, 1000);
    };
    
    if (userContext?.isInitialized === false || (userContext?.isInitialized && userContext?.currentUser)) {
        return <div className="flex h-screen w-full items-center justify-center login-gradient"><Loader2 className="h-8 w-8 animate-spin text-white" /></div>;
    }


    return (
        <div className="flex min-h-screen items-center justify-center login-gradient relative overflow-hidden">
            <WavyBackground />
             <div className="absolute bottom-4 left-4 flex h-8 w-8 items-center justify-center rounded-md bg-slate-900/50 text-xs font-bold text-white">
                N
            </div>
            <main className="w-full max-w-sm rounded-2xl bg-slate-900/40 backdrop-blur-lg shadow-2xl border border-slate-800/80">
                <div className="p-8 text-white">
                    <h2 className="mb-6 text-center text-3xl font-bold">Login</h2>
                    
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="User Name"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="bg-slate-800/50 border-slate-700/80 pl-10 text-white placeholder:text-white/50 focus:ring-offset-0 focus:ring-white"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                            <Input 
                                id="password" 
                                type="password"
                                placeholder="Password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading} 
                                className="bg-slate-800/50 border-slate-700/80 pl-10 text-white placeholder:text-white/50 focus:ring-offset-0 focus:ring-white"
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember-me" className="border-white/50 data-[state=checked]:bg-white/20 data-[state=checked]:text-white focus:ring-offset-0 focus:ring-white/50" />
                                <Label htmlFor="remember-me" className="text-white">Remember Me</Label>
                            </div>
                            <Link href="#" className="font-semibold text-white hover:underline">
                                Forgot me?
                            </Link>
                        </div>

                        <Button className="w-full !mt-8 bg-white/90 text-slate-800 font-bold hover:bg-white" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin"/> : 'Login'}
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}
```

---
---

### Archivo: `src/app/page.tsx`

```tsx
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/login')
}
```

---
---

### Archivo: `src/components/FirebaseErrorListener.tsx`

```tsx
// This component can be used to listen for and display Firebase errors globally.
// For now, it is empty.
```

---
---

### Archivo: `src/components/date-range-picker.tsx`

```tsx
"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: es })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: es })
              )
            ) : (
              <span>Elige una fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
```

---
---

### Archivo: `src/components/logo.tsx`

```tsx
'use client';
import { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { BusinessContext, LogoShape } from '@/context/business-context';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo() {
  const context = useContext(BusinessContext);

  const logoShapeClasses: Record<LogoShape, string> = {
    square: 'rounded-none',
    rounded: 'rounded-sm',
    circle: 'rounded-full',
  };

  if (!context) {
    // This can happen during initial server render before the context provider is mounted.
    // Return a default logo.
    return (
        <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">CommerceFlow</span>
        </div>
    );
  }

  const { businessInfo } = context;
  const shapeClass = logoShapeClasses[businessInfo.logoShape || 'square'];
  const logoSize = businessInfo.logoSize || 24;
  const headlineFontSize = businessInfo.headlineFontSize || 20;

  return (
    <div className="flex items-center gap-2">
      {businessInfo.logo ? (
        <div 
          className={cn("overflow-hidden flex-shrink-0", shapeClass)}
          style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
        >
            <Image 
              src={businessInfo.logo} 
              alt={businessInfo.name} 
              width={logoSize} 
              height={logoSize} 
              className="h-full w-full object-cover" 
              style={{ transform: `scale(${businessInfo.logoZoom || 1})` }}
            />
        </div>
      ) : (
        <ShoppingCart 
          className="text-primary flex-shrink-0" 
          style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
        />
      )}
      <span 
        className="font-bold whitespace-nowrap"
        style={{ fontSize: `${headlineFontSize}px` }}
      >
        {businessInfo.name}
      </span>
    </div>
  );
}
```

---
---

### Archivo: `src/components/ui/accordion.tsx`

```tsx
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

---
---

### Archivo: `src/components/ui/alert-dialog.tsx`

```tsx
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
```

---
---

### Archivo: `src/components/ui/alert.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
```

---
---

### Archivo: `src/components/ui/avatar.tsx`

```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
```

---
---

### Archivo: `src/components/ui/badge.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        info: "border-transparent bg-blue-500 text-white hover:bg-blue-500/80",
        success: "border-transparent bg-green-500 text-white hover:bg-green-500/80",
        warning: "border-transparent bg-orange-500 text-white hover:bg-orange-500/80",
        delivery: "border-transparent bg-purple-500 text-white hover:bg-purple-500/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

---
---

### Archivo: `src/components/ui/button.tsx`

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

---
---

### Archivo: `src/components/ui/calendar.tsx`

```tsx
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
```

---
---

### Archivo: `src/components/ui/card.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

---
---

### Archivo: `src/components/ui/carousel.tsx`

```tsx
"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
```

---
---

### Archivo: `src/components/ui/chart.tsx`

```tsx
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
```

---
---

### Archivo: `src/components/ui/chat-bubble.tsx`

```tsx
"use client";

import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { Skeleton } from "./skeleton";

interface ChatBubbleProps {
  sender: 'user' | 'agent';
  message?: string;
  isLoading?: boolean;
}

export function ChatBubble({ sender, message, isLoading = false }: ChatBubbleProps) {
  const isUser = sender === 'user';

  return (
    <div className={cn("flex items-start gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bot className="h-5 w-5" />
        </div>
      )}
      <div
        className={cn(
          "max-w-xs rounded-lg p-3 text-sm lg:max-w-md",
          isUser
            ? "rounded-br-none bg-primary text-primary-foreground"
            : "rounded-bl-none bg-muted"
        )}
      >
        {isLoading ? (
            <div className="flex items-center gap-2">
                <Skeleton className="w-2 h-2 rounded-full animate-bounce delay-0" />
                <Skeleton className="w-2 h-2 rounded-full animate-bounce delay-150" />
                <Skeleton className="w-2 h-2 rounded-full animate-bounce delay-300" />
            </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
      {isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
```

---
---

### Archivo: `src/components/ui/checkbox.tsx`

```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
```

---
---

### Archivo: `src/components/ui/collapsible.tsx`

```tsx
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
```

---
---

### Archivo: `src/components/ui/combobox.tsx`

```tsx
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ComboboxOption = {
    value: string;
    label: string;
}

interface ComboboxProps {
    options: ComboboxOption[];
    value: string;
    onSelect: (value: string) => void;
    placeholder: string;
    searchPlaceholder: string;
}

export function Combobox({ options, value, onSelect, placeholder, searchPlaceholder }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? selectedLabel : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: "var(--radix-popover-trigger-width)" }}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onSelect(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

---
---

### Archivo: `src/components/ui/command.tsx`

```tsx
"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
```

---
---

### Archivo: `src/components/ui/dialog.tsx`

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

---
---

### Archivo: `src/components/ui/dropdown-menu.tsx`

```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
```

---
---

### Archivo: `src/components/ui/form.tsx`

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
```

---
---

### Archivo: `src/components/ui/input.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

---
---

### Archivo: `src/components/ui/label.tsx`

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

---
---

### Archivo: `src/components/ui/menubar.tsx`

```tsx
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
```

---
---

### Archivo: `src/components/ui/popover.tsx`

```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
```

---
---

### Archivo: `src/components/ui/progress.tsx`

```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
```

---
---

### Archivo: `src/components/ui/radio-group.tsx`

```tsx
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
```

---
---

### Archivo: `src/components/ui/scroll-area.tsx`

```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
```

---
---

### Archivo: `src/components/ui/select.tsx`

```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
```

---
---

### Archivo: `src/components/ui/separator.tsx`

```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

---
---

### Archivo: `src/components/ui/sheet.tsx`

```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

---
---

### Archivo: `src/components/ui/sidebar-new.tsx`

```tsx
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-[hsl(var(--sidebar-background))]",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-[hsl(var(--sidebar-background))] text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-[hsl(var(--sidebar-background))] p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-[hsl(var(--sidebar-background))] group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-[hsl(var(--sidebar-border))] group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-[hsl(var(--sidebar-border))] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-[hsl(var(--sidebar-background))]",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--sidebar-ring))]",
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-[hsl(var(--sidebar-border))]", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-[hsl(var(--sidebar-ring))] transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-[hsl(var(--sidebar-ring))] transition-transform hover:bg-[hsl(var(--sidebar-accent))] hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-[hsl(var(--sidebar-ring))] transition-[width,height,padding] hover:bg-[hsl(var(--sidebar-accent))] hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-[hsl(var(--sidebar-accent))] active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-[hsl(var(--sidebar-accent))] data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-[hsl(var(--sidebar-accent))] data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-[hsl(var(--sidebar-accent))] hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-[hsl(var(--sidebar-ring))] transition-transform hover:bg-[hsl(var(--sidebar-accent))] hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 flex-1 max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-[hsl(var(--sidebar-border))] px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-[hsl(var(--sidebar-ring))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-[hsl(var(--sidebar-accent))] active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-[hsl(var(--sidebar-accent))] data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
```

---
---

### Archivo: `src/components/ui/skeleton.tsx`

```tsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
```

---
---

### Archivo: `src/components/ui/slider.tsx`

```tsx
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
```

---
---

### Archivo: `src/components/ui/switch.tsx`

```tsx
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
```

---
---

### Archivo: `src/components/ui/table.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
```

---
---

### Archivo: `src/components/ui/tabs.tsx`

```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
```

---
---

### Archivo: `src/components/ui/textarea.tsx`

```tsx
import * as React from 'react';

import {cn} from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
```

---
---

### Archivo: `src/components/ui/toast.tsx`

```tsx
"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
```

---
---

### Archivo: `src/components/ui/toaster.tsx`

```tsx
"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```

---
---

### Archivo: `src/components/ui/tooltip.tsx`

```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

---
---

### Archivo: `src/components/user-nav.tsx`

```tsx
'use client';

import React, { useState, useContext } from "react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User as UserIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserContext } from "@/context/user-context";
import type { UserStatus } from '@/lib/placeholder-data';
import { useRouter } from "next/navigation";
import { renderAvatar } from "@/lib/user-avatar";

const statusConfig: Record<UserStatus, { color: string; label: string }> = {
    Activo: {
      color: "bg-green-500",
      label: "Activo",
    },
    Ausente: {
      color: "bg-yellow-500",
      label: "Ausente",
    },
    Ocupado: {
      color: "bg-red-500",
      label: "Ocupado",
    },
    Inactivo: {
        color: "bg-gray-400",
        label: "Inactivo"
    }
  };

const StatusCircle = ({ status }: { status: UserStatus }) => (
    <span className={cn(
        "absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-background",
        statusConfig[status]?.color || 'bg-gray-400'
    )} />
);


export function UserNav() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const userContext = useContext(UserContext);
  const router = useRouter();

  if (!userContext) {
    return null; // Or a loading spinner
  }
  
  const { currentUser, setCurrentUser, users, setUsers } = userContext;


  const handleStatusChange = (value: UserStatus) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, status: value };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    }
    setProfileOpen(false);
  }
  
  const handleLogout = () => {
    if (userContext.handleLogout) {
      userContext.handleLogout();
      router.push('/login');
    }
  };

  if (!currentUser) {
    return null;
  }

  const settingsLink = currentUser.role === 'Administrador' ? '/dashboard/settings' : '/dashboard/settings/users';


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
           <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
             {renderAvatar(currentUser)}
             <StatusCircle status={currentUser.status} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{currentUser.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {currentUser.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setProfileOpen(true)}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
               <Link href={settingsLink}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isProfileOpen} onOpenChange={setProfileOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Estado del Perfil</DialogTitle>
                <DialogDescription>
                    Selecciona tu estado actual para que tu equipo lo sepa.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="status-select">Establecer Estado</Label>
                    <Select defaultValue={currentUser.status} onValueChange={(value: UserStatus) => handleStatusChange(value)}>
                        <SelectTrigger id="status-select">
                            <SelectValue placeholder="Selecciona tu estado" />
                        </SelectTrigger>
                        <SelectContent>
                           {Object.entries(statusConfig).map(([status, config]) => (
                                <SelectItem key={status} value={status}>
                                    <div className="flex items-center gap-2">
                                        <span className={cn("h-2 w-2 rounded-full", config.color)} />
                                        {config.label}
                                    </div>
                                </SelectItem>
                           ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setProfileOpen(false)}>Cerrar</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
```

---
---

### Archivo: `src/context/business-context.tsx`

```tsx
'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';

export type LogoShape = 'square' | 'rounded' | 'circle';

type BusinessInfo = {
  name: string;
  address: string;
  logo: string | null;
  logoZoom?: number;
  logoShape?: LogoShape;
  logoSize?: number;
  headlineFontSize?: number;
};

type BusinessContextType = {
  businessInfo: BusinessInfo;
  setBusinessInfo: React.Dispatch<React.SetStateAction<BusinessInfo>>;
};

export const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

const initialBusinessInfo: BusinessInfo = {
    name: 'CommerceFlow',
    address: 'Calle Falsa 123, Springfield',
    logo: null,
    logoZoom: 1,
    logoShape: 'square',
    logoSize: 24, // Default size in pixels
    headlineFontSize: 20, // Default headline font size
};


export const BusinessProvider = ({ children }: { children: ReactNode }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(initialBusinessInfo);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedInfo = localStorage.getItem('businessInfo');
      if (storedInfo) {
        const parsedInfo = JSON.parse(storedInfo);
        // Ensure defaults if not present
        if (!parsedInfo.logoZoom) parsedInfo.logoZoom = 1;
        if (!parsedInfo.logoShape) parsedInfo.logoShape = 'square';
        if (!parsedInfo.logoSize) parsedInfo.logoSize = 24;
        if (!parsedInfo.headlineFontSize) parsedInfo.headlineFontSize = 20;
        
        setBusinessInfo(parsedInfo);
      }
    } catch (error) {
      console.error("Failed to parse business info from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('businessInfo', JSON.stringify(businessInfo));
      } catch (error) {
          console.error("Failed to save business info to localStorage", error);
      }
    }
  }, [businessInfo, isInitialized]);


  return (
    <BusinessContext.Provider value={{ businessInfo, setBusinessInfo }}>
      {children}
    </BusinessContext.Provider>
  );
};
```

---
---

### Archivo: `src/context/category-context.tsx`

```tsx
'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { products } from '@/lib/placeholder-data';

type Category = {
  id: string;
  name: string;
};

type CategoryContextType = {
  categories: Category[];
  addCategory: (name: string) => void;
  updateCategory: (id: string, name: string) => void;
  deleteCategory: (id: string) => void;
  loading: boolean;
};

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching categories from products data
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const categoryObjects = uniqueCategories.map(name => ({
      id: name,
      name: name
    }));
    setCategories(categoryObjects);
    setLoading(false);
  }, []);
  
  const addCategory = (name: string) => {
    if (!categories.find(c => c.name.toLowerCase() === name.toLowerCase())) {
      const newCategory = { id: name, name };
      setCategories(prev => [...prev, newCategory]);
    }
  };

  const updateCategory = (id: string, name: string) => {
    // This is complex as it requires updating all products with the old category.
    // For this simulation, we'll just update the category list.
    // A real implementation would need to handle product updates.
    console.warn("Category update is not fully implemented in this prototype.");
    setCategories(prev => prev.map(c => c.id === id ? { ...c, name: name } : c));
  };

  const deleteCategory = (id: string) => {
     // In a real app, this would require checking if any product is using this category first.
     console.warn("Category deletion is not fully implemented in this prototype.");
     setCategories(prev => prev.filter(c => c.id !== id));
  };


  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};
```

---
---

### Archivo: `src/context/theme-context.tsx`

```tsx
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ColorTheme = 'default' | 'gold' | 'emerald' | 'cobalt' | 'ruby';

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorTheme: ColorTheme;
  setColorTheme: (colorTheme: ColorTheme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

const colorThemeConfig: Record<ColorTheme, { primary: string, primary_dark: string }> = {
    default: {
        primary: '330 60% 35%',
        primary_dark: '330 60% 55%'
    },
    gold: {
        primary: '35 92% 55%',
        primary_dark: '35 92% 65%'
    },
    emerald: {
        primary: '142 71% 45%',
        primary_dark: '142 71% 55%'
    },
    cobalt: {
        primary: '215 91% 65%',
        primary_dark: '215 91% 75%'
    },
    ruby: {
        primary: '350 82% 55%',
        primary_dark: '350 82% 65%'
    },
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultColorTheme = 'default',
  storageKey = 'vite-ui-theme',
  colorStorageKey = 'vite-ui-color-theme',
}: {
  children: ReactNode;
  defaultTheme?: string;
  defaultColorTheme?: ColorTheme;
  storageKey?: string;
  colorStorageKey?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
        const storedTheme = localStorage.getItem(storageKey) as Theme;
        if (storedTheme) return storedTheme;
        if (defaultTheme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
    } catch (e) {
        // localStorage is not available
    }
    return defaultTheme as Theme;
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
     if (typeof window === 'undefined') return defaultColorTheme;
     try {
        return (localStorage.getItem(colorStorageKey) as ColorTheme) || defaultColorTheme
     } catch(e) {
        return defaultColorTheme;
     }
  });

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
        // localStorage not available
    }
    setThemeState(newTheme);
  }

  const setColorTheme = (newColorTheme: ColorTheme) => {
      try {
        localStorage.setItem(colorStorageKey, newColorTheme);
      } catch (e) {
          // localStorage not available
      }
      setColorThemeState(newColorTheme);
  }

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const config = colorThemeConfig[colorTheme];
    
    if (config) {
        if (theme === 'light') {
            root.style.setProperty('--primary', config.primary);
            root.style.setProperty('--accent', config.primary);
            root.style.setProperty('--ring', config.primary);
        } else {
            root.style.setProperty('--primary', config.primary_dark);
            root.style.setProperty('--accent', config.primary_dark);
            root.style.setProperty('--ring', config.primary_dark);
        }
    }
  }, [colorTheme, theme]);

  const value = {
    theme,
    setTheme,
    colorTheme,
    setColorTheme,
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
```

---
---

### Archivo: `src/context/user-context.tsx`

```tsx
'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/lib/placeholder-data';
import { defaultUsers } from '@/lib/user-data';

type UserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isInitialized: boolean;
  handleLogin: (email: string, pass: string) => boolean;
  handleLogout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Simulate checking for a logged-in user in localStorage
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  const handleLogin = (email: string, pass: string): boolean => {
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      const userToStore = { ...user };
      delete userToStore.password; // Don't store password
      
      try {
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
      } catch (error) {
          console.error("Failed to save user to localStorage", error);
      }
      
      setCurrentUser(userToStore);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('currentUser');
    } catch (error) {
        console.error("Failed to remove user from localStorage", error);
    }
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, users, setUsers, isInitialized, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
```

---
---

### Archivo: `src/firebase/auth/use-user.tsx`

```tsx
// This hook can be used to access the current Firebase user.
// For now, it is empty.
```

---
---

### Archivo: `src/firebase/client-provider.tsx`

```tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase, type FirebaseServices } from '.';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<FirebaseServices | null>(null);

  useEffect(() => {
    // Initialize Firebase on the client side
    const firebaseServices = initializeFirebase();
    setServices(firebaseServices);
  }, []);

  if (!services) {
    // You can return a loader here if you want
    return null; 
  }

  return (
    <FirebaseProvider {...services}>
      {children}
    </FirebaseProvider>
  );
}
```

---
---

### Archivo: `src/firebase/config.ts`

```ts
// This file can be used to store and export the Firebase config.
// For now, it is empty.
```

---
---

### Archivo: `src/firebase/error-emitter.ts`

```ts
// This file can be used to create and export a global error emitter.
// For now, it is empty.
```

---
---

### Archivo: `src/firebase/errors.ts`

```ts
// This file can be used to define and export custom Firebase error types.
// For now, it is empty.
```

---
---

### Archivo: `src/firebase/firestore/use-collection.tsx`

```tsx
// This hook can be used to subscribe to a Firestore collection.
// For now, it is empty.
```

---
---

### Archivo: `src/firebase/firestore/use-doc.tsx`

```tsx
// This hook can be used to subscribe to a Firestore document.
// For now, it is empty.
```

---
---

### Archivo: `src/firebase/index.ts`

```ts
'use client';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

export type FirebaseServices = {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

let firebaseServices: FirebaseServices | null = null;

export function initializeFirebase(): FirebaseServices {
  if (firebaseServices) {
    return firebaseServices;
  }

  if (getApps().length === 0) {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    firebaseServices = { firebaseApp, auth, firestore };
  } else {
    const firebaseApp = getApps()[0];
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    firebaseServices = { firebaseApp, auth, firestore };
  }
  
  return firebaseServices;
}
```

---
---

### Archivo: `src/firebase/non-blocking-login.tsx`

```tsx
// This component can be used to handle non-blocking login.
// For now, it is empty.
```

---
---

### Archivo: `src/firebase/non-blocking-updates.tsx`

```tsx
// This component can be used to handle non-blocking Firestore updates.
// For now, it is empty.
```

---
---

### Archivo: `src/firebase/provider.tsx`

```tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

interface FirebaseContextValue {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(undefined);

export function FirebaseProvider({
  children,
  firebaseApp,
  auth,
  firestore,
}: {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}) {
  return (
    <FirebaseContext.Provider value={{ firebaseApp, auth, firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  if (!context.firebaseApp || !context.auth || !context.firestore) {
      throw new Error('Firebase core services not available. Check FirebaseProvider props.');
  }
  return context;
};

export const useFirebaseApp = () => useFirebase().firebaseApp;
export const useAuth = () => useFirebase().auth;
export const useFirestore = () => useFirebase().firestore;
```

---
---

### Archivo: `src/hooks/use-mobile.tsx`

```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

---
---

### Archivo: `src/hooks/use-toast.ts`

```ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```

---
---

### Archivo: `src/lib/placeholder-data.ts`

```ts
import imagePlaceholders from './placeholder-images.json';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number; // Cost to calculate profit
  stock: number;
  sku: string;
  imageUrl: string;
  imageHint: string;
};

export type Order = {
  id: string;
  customerName: string;
  items: { product: Product; quantity: number }[];
  total: number;
  subtotal: number;
  tax: number;
  tip: number; // Tip amount
  profit: number;
  status: 'Pendiente' | 'Preparando' | 'Listo' | 'En entrega' | 'Completado' | 'Cancelado' | 'Pagado';
  createdAt: string;
  type: 'En local' | 'Para llevar' | 'A domicilio';
  userId?: string; // ID of the user who created the order
  paymentMethod: 'Efectivo' | 'Tarjeta' | 'Transferencia';
};

export type UserStatus = "Activo" | "Inactivo" | "Ausente" | "Ocupado";

export type UserRole = 'Administrador' | 'Mesero' | 'Vendedor' | 'Bartender' | 'Cajero';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  status: UserStatus;
  password?: string;
  avatarZoom?: number;
};
// NOTE: Product data is now managed in Firestore. This file can be used for initial data seeding or reference.
const productImages = new Map(imagePlaceholders.placeholderImages.map(p => [p.id, p]));

export const products: Product[] = [
  // Entradas y Picadas
  { id: 'prod_11', name: 'Empanada de Carne', category: 'Entradas y Picadas', price: 3000, cost: 1000, stock: 200, sku: 'ENT-001', imageUrl: productImages.get('prod_11')?.imageUrl!, imageHint: productImages.get('prod_11')?.imageHint! },
  { id: 'prod_28', name: 'Carimañolas de Queso', category: 'Entradas y Picadas', price: 3500, cost: 1200, stock: 150, sku: 'ENT-002', imageUrl: productImages.get('prod_28')?.imageUrl!, imageHint: productImages.get('prod_28')?.imageHint! },
  { id: 'prod_29', name: 'Patacones con Hogao', category: 'Entradas y Picadas', price: 9000, cost: 3500, stock: 80, sku: 'ENT-003', imageUrl: productImages.get('prod_29')?.imageUrl!, imageHint: productImages.get('prod_29')?.imageHint! },
  { id: 'prod_13', name: 'Chicharrón con Arepa', category: 'Entradas y Picadas', price: 12000, cost: 5000, stock: 60, sku: 'ENT-004', imageUrl: productImages.get('prod_13')?.imageUrl!, imageHint: productImages.get('prod_13')?.imageHint! },
  { id: 'prod_14', name: 'Papas Criollas', category: 'Entradas y Picadas', price: 7000, cost: 2500, stock: 100, sku: 'ENT-005', imageUrl: productImages.get('prod_14')?.imageUrl!, imageHint: productImages.get('prod_14')?.imageHint! },
  
  // Sopas y Ajiacos
  { id: 'prod_6', name: 'Caldo de Costilla', category: 'Sopas y Ajiacos', price: 12000, cost: 5000, stock: 30, sku: 'SOP-001', imageUrl: productImages.get('prod_6')?.imageUrl!, imageHint: productImages.get('prod_6')?.imageHint! },
  { id: 'prod_9', name: 'Ajiaco Santafereño', category: 'Sopas y Ajiacos', price: 18000, cost: 8000, stock: 20, sku: 'SOP-002', imageUrl: productImages.get('prod_9')?.imageUrl!, imageHint: productImages.get('prod_9')?.imageHint! },
  { id: 'prod_15', name: 'Sopa de Mondongo', category: 'Sopas y Ajiacos', price: 16000, cost: 7000, stock: 25, sku: 'SOP-003', imageUrl: productImages.get('prod_15')?.imageUrl!, imageHint: productImages.get('prod_15')?.imageHint! },
  { id: 'prod_16', name: 'Sancocho de Gallina', category: 'Sopas y Ajiacos', price: 22000, cost: 10000, stock: 18, sku: 'SOP-004', imageUrl: productImages.get('prod_16')?.imageUrl!, imageHint: productImages.get('prod_16')?.imageHint! },
  
  // Platos Fuertes
  { id: 'prod_10', name: 'Bandeja Paisa', category: 'Platos Fuertes', price: 28000, cost: 13000, stock: 15, sku: 'PF-001', imageUrl: productImages.get('prod_10')?.imageUrl!, imageHint: productImages.get('prod_10')?.imageHint! },
  { id: 'prod_17', name: 'Sobrebarriga a la Criolla', category: 'Platos Fuertes', price: 26000, cost: 12000, stock: 20, sku: 'PF-002', imageUrl: productImages.get('prod_17')?.imageUrl!, imageHint: productImages.get('prod_17')?.imageHint! },
  { id: 'prod_18', name: 'Mojarra Frita con Patacones', category: 'Platos Fuertes', price: 32000, cost: 15000, stock: 22, sku: 'PF-003', imageUrl: productImages.get('prod_18')?.imageUrl!, imageHint: productImages.get('prod_18')?.imageHint! },
  { id: 'prod_30', name: 'Cazuela de Mariscos', category: 'Platos Fuertes', price: 38000, cost: 18000, stock: 12, sku: 'PF-004', imageUrl: productImages.get('prod_30')?.imageUrl!, imageHint: productImages.get('prod_30')?.imageHint! },
  { id: 'prod_33', name: 'Lechona Tolimense (Porción)', category: 'Platos Fuertes', price: 25000, cost: 11000, stock: 30, sku: 'PF-005', imageUrl: productImages.get('prod_33')?.imageUrl!, imageHint: productImages.get('prod_33')?.imageHint! },

  // Arepas y Envueltos
  { id: 'prod_5', name: 'Arepa con Queso', category: 'Arepas y Envueltos', price: 6000, cost: 2500, stock: 50, sku: 'ARE-001', imageUrl: productImages.get('prod_5')?.imageUrl!, imageHint: productImages.get('prod_5')?.imageHint! },
  { id: 'prod_19', name: 'Arepa de Huevo', category: 'Arepas y Envueltos', price: 5500, cost: 2000, stock: 60, sku: 'ARE-002', imageUrl: productImages.get('prod_19')?.imageUrl!, imageHint: productImages.get('prod_19')?.imageHint! },
  { id: 'prod_32', name: 'Tamal Tolimense', category: 'Arepas y Envueltos', price: 15000, cost: 6000, stock: 40, sku: 'ARE-003', imageUrl: productImages.get('prod_32')?.imageUrl!, imageHint: productImages.get('prod_32')?.imageHint! },
  { id: 'prod_2', name: 'Almojábana', category: 'Arepas y Envueltos', price: 2500, cost: 900, stock: 80, sku: 'ARE-004', imageUrl: productImages.get('prod_2')?.imageUrl!, imageHint: productImages.get('prod_2')?.imageHint! },
  { id: 'prod_8', name: 'Buñuelo', category: 'Arepas y Envueltos', price: 2000, cost: 700, stock: 100, sku: 'ARE-005', imageUrl: productImages.get('prod_8')?.imageUrl!, imageHint: productImages.get('prod_8')?.imageHint! },
  
  // Postres
  { id: 'prod_3', name: 'Torta de Tres Leches', category: 'Postres', price: 7500, cost: 3500, stock: 25, sku: 'POS-001', imageUrl: productImages.get('prod_3')?.imageUrl!, imageHint: productImages.get('prod_3')?.imageHint! },
  { id: 'prod_20', name: 'Mazamorra con Panela', category: 'Postres', price: 6000, cost: 2000, stock: 40, sku: 'POS-002', imageUrl: productImages.get('prod_20')?.imageUrl!, imageHint: productImages.get('prod_20')?.imageHint! },
  { id: 'prod_21', name: 'Cholao Valluno', category: 'Postres', price: 9000, cost: 4000, stock: 30, sku: 'POS-003', imageUrl: productImages.get('prod_21')?.imageUrl!, imageHint: productImages.get('prod_21')?.imageHint! },
  { id: 'prod_22', name: 'Oblea con Arequipe', category: 'Postres', price: 4500, cost: 1500, stock: 100, sku: 'POS-004', imageUrl: productImages.get('prod_22')?.imageUrl!, imageHint: productImages.get('prod_22')?.imageHint! },
  { id: 'prod_34', name: 'Postre de Natas', category: 'Postres', price: 8000, cost: 3800, stock: 28, sku: 'POS-005', imageUrl: productImages.get('prod_34')?.imageUrl!, imageHint: productImages.get('prod_34')?.imageHint! },
  { id: 'prod_35', name: 'Merengón de Guanábana', category: 'Postres', price: 8500, cost: 4200, stock: 25, sku: 'POS-006', imageUrl: productImages.get('prod_35')?.imageUrl!, imageHint: productImages.get('prod_35')?.imageHint! },
  
  // Bebidas Típicas
  { id: 'prod_4', name: 'Jugo de Lulo', category: 'Bebidas Típicas', price: 5000, cost: 2000, stock: 90, sku: 'BEB-001', imageUrl: productImages.get('prod_4')?.imageUrl!, imageHint: productImages.get('prod_4')?.imageHint! },
  { id: 'prod_12', name: 'Limonada de Coco', category: 'Bebidas Típicas', price: 7000, cost: 3000, stock: 70, sku: 'BEB-002', imageUrl: productImages.get('prod_12')?.imageUrl!, imageHint: productImages.get('prod_12')?.imageHint! },
  { id: 'prod_23', name: 'Aguapanela con Queso', category: 'Bebidas Típicas', price: 6000, cost: 2200, stock: 80, sku: 'BEB-003', imageUrl: productImages.get('prod_23')?.imageUrl!, imageHint: productImages.get('prod_23')?.imageHint! },
  { id: 'prod_24', name: 'Refajo', category: 'Bebidas Típicas', price: 5500, cost: 2500, stock: 95, sku: 'BEB-004', imageUrl: productImages.get('prod_24')?.imageUrl!, imageHint: productImages.get('prod_24')?.imageHint! },
  { id: 'prod_36', name: 'Jugo de Maracuyá', category: 'Bebidas Típicas', price: 5000, cost: 2000, stock: 90, sku: 'BEB-005', imageUrl: productImages.get('prod_36')?.imageUrl!, imageHint: productImages.get('prod_36')?.imageHint! },
  { id: 'prod_37', name: 'Jugo de Mora', category: 'Bebidas Típicas', price: 5000, cost: 2000, stock: 90, sku: 'BEB-006', imageUrl: productImages.get('prod_37')?.imageUrl!, imageHint: productImages.get('prod_37')?.imageHint! },
  
  // Cafés Especiales
  { id: 'prod_1', name: 'Tinto Campesino', category: 'Cafés Especiales', price: 3500, cost: 1200, stock: 150, sku: 'CAF-001', imageUrl: productImages.get('prod_1')?.imageUrl!, imageHint: productImages.get('prod_1')?.imageHint! },
  { id: 'prod_25', name: 'Café con Leche', category: 'Cafés Especiales', price: 4000, cost: 1500, stock: 140, sku: 'CAF-002', imageUrl: productImages.get('prod_25')?.imageUrl!, imageHint: productImages.get('prod_25')?.imageHint! },
  { id: 'prod_38', name: 'Café Guayoyo', category: 'Cafés Especiales', price: 3000, cost: 1000, stock: 160, sku: 'CAF-003', imageUrl: productImages.get('prod_38')?.imageUrl!, imageHint: productImages.get('prod_38')?.imageHint! },
  { id: 'prod_39', name: 'Aromática de Frutas', category: 'Cafés Especiales', price: 4500, cost: 1800, stock: 120, sku: 'CAF-004', imageUrl: productImages.get('prod_39')?.imageUrl!, imageHint: productImages.get('prod_39')?.imageHint! },
  
  // Cervezas y Licores
  { id: 'prod_7', name: 'Club Colombia', category: 'Cervezas y Licores', price: 5000, cost: 2500, stock: 120, sku: 'LIC-001', imageUrl: productImages.get('prod_7')?.imageUrl!, imageHint: productImages.get('prod_7')?.imageHint! },
  { id: 'prod_40', name: 'Poker', category: 'Cervezas y Licores', price: 4500, cost: 2200, stock: 150, sku: 'LIC-002', imageUrl: productImages.get('prod_40')?.imageUrl!, imageHint: productImages.get('prod_40')?.imageHint! },
  { id: 'prod_41', name: 'Aguila', category: 'Cervezas y Licores', price: 4500, cost: 2200, stock: 150, sku: 'LIC-003', imageUrl: productImages.get('prod_41')?.imageUrl!, imageHint: productImages.get('prod_41')?.imageHint! },
  { id: 'prod_26', name: 'Aguardiente (Copa)', category: 'Cervezas y Licores', price: 7000, cost: 3000, stock: 50, sku: 'LIC-004', imageUrl: productImages.get('prod_26')?.imageUrl!, imageHint: productImages.get('prod_26')?.imageHint! },
  { id: 'prod_27', name: 'Ron Viejo de Caldas (Copa)', category: 'Cervezas y Licores', price: 8000, cost: 3500, stock: 50, sku: 'LIC-005', imageUrl: productImages.get('prod_27')?.imageUrl!, imageHint: productImages.get('prod_27')?.imageHint! },
];
```

---
---

### Archivo: `src/lib/placeholder-images.json`

```json
{
  "placeholderImages": [
    {
      "id": "prod_1",
      "description": "A cup of traditional colombian coffee",
      "imageUrl": "https://images.unsplash.com/photo-1633627354173-1a26871e3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjb2xvbWJpYW4lMjBjb2ZmZWV8ZW58MHx8fHwxNzU5MzY0MDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "colombian coffee"
    },
    {
      "id": "prod_2",
      "description": "A traditional colombian almojabana",
      "imageUrl": "https://images.unsplash.com/photo-1599806848384-a408420e6a61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxhbG1vamFiYW5hJTIwY29sb21iaWFuYXxlbnwwfHx8fDE3NTkzNjQwMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "almojabana colombiana"
    },
    {
      "id": "prod_3",
      "description": "A slice of tres leches cake",
      "imageUrl": "https://images.unsplash.com/photo-1691175595365-211c15192433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8dHJlcyUyMGxlY2hlc3xlbnwwfHx8fDE3NTkzNjQwMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "tres leches"
    },
    {
      "id": "prod_4",
      "description": "A glass of lulo juice",
      "imageUrl": "https://images.unsplash.com/photo-1642084962479-5165e56e3a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxsdWxvJTIwanVpY2V8ZW58MHx8fHwxNzU5MzY0MDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "lulo juice"
    },
    {
      "id": "prod_5",
      "description": "A colombian arepa with cheese",
      "imageUrl": "https://images.unsplash.com/photo-1751183295754-9cff9577a44e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxhcmVwYSUyMGNvbiUyMHF1ZXNvfGVufDB8fHx8MTc1OTM2NDAwMnww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "arepa con queso"
    },
    {
      "id": "prod_6",
      "description": "A bowl of caldo de costilla soup",
      "imageUrl": "https://images.unsplash.com/photo-1689793592282-015d9db77917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjYWxkbyUyMGRlJTIwY29zdGlsbGF8ZW58MHx8fHwxNzU5MzY0MDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "caldo de costilla"
    },
    {
      "id": "prod_7",
      "description": "A bottle of Club Colombia beer",
      "imageUrl": "https://images.unsplash.com/photo-1614633739893-531fe879786c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb2xvbWJpYW4lMjBiZWVyfGVufDB8fHx8MTc1OTM2NDAwMnww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "colombian beer"
    },
    {
      "id": "prod_8",
      "description": "A colombian buñuelo",
      "imageUrl": "https://images.unsplash.com/photo-1710011246768-8c309f49b147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y29sb21iaWFuJTIwYnUlQzMlQjF1ZWxvfGVufDB8fHx8MTc1OTM2NDAwMnww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "colombian buñuelo"
    },
    {
      "id": "prod_9",
      "description": "A bowl of Ajiaco Santafereño soup",
      "imageUrl": "https://images.unsplash.com/photo-1659603667872-915f2b953cb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YWppYWNvJTIwc291cHxlbnwwfHx8fDE3NTkzNjQwMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "ajiaco soup"
    },
    {
      "id": "prod_10",
      "description": "A Bandeja Paisa platter",
      "imageUrl": "https://images.unsplash.com/photo-1684159607944-030be9444b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxiYW5kZWphJTIwcGFpc2F8ZW58MHx8fHwxNzU5MzY0MDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "bandeja paisa"
    },
    {
      "id": "prod_11",
      "description": "A meat empanada",
      "imageUrl": "https://images.unsplash.com/photo-1619926096619-5956ab4dfb1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtZWF0JTIwZW1wYW5hZGF8ZW58MHx8fHwxNzU5MzY0MDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "meat empanada"
    },
    {
      "id": "prod_12",
      "description": "A glass of coconut lemonade",
      "imageUrl": "https://images.unsplash.com/photo-1669207607697-a98803f00e5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxjb2NvbnV0JTIwbGVtb25hZGV8ZW58MHx8fHwxNzU5MzY0MDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "coconut lemonade"
    },
    {
      "id": "prod_13",
      "description": "Chicharrones with arepa",
      "imageUrl": "https://images.unsplash.com/photo-1749294241404-916a9a7f3d44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxmcmllZCUyMHBvcmslMjBiZWxseXxlbnwwfHx8fDE3NTkzNTY3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "fried pork belly"
    },
    {
      "id": "prod_14",
      "description": "Papas criollas (small yellow potatoes)",
      "imageUrl": "https://images.unsplash.com/photo-1702619208699-e7fe8b188bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx5ZWxsb3clMjBwb3RhdG9lc3xlbnwwfHx8fDE3NTkzNTY3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "yellow potatoes"
    },
    {
      "id": "prod_15",
      "description": "Mondongo soup",
      "imageUrl": "https://images.unsplash.com/photo-1548722104-856e02d9b6b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx0cmlwZSUyMHNvdXB8ZW58MHx8fHwxNzU5MzU2NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "tripe soup"
    },
    {
      "id": "prod_16",
      "description": "Sancocho de Gallina",
      "imageUrl": "https://images.unsplash.com/photo-1665594051407-7385d281ad76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoZW4lMjBzb3VwfGVufDB8fHx8MTc1OTM1Njc0OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "hen soup"
    },
    {
      "id": "prod_17",
      "description": "Sobrebarriga a la criolla",
      "imageUrl": "https://images.unsplash.com/photo-1690983325551-b922137727be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxmbGFuayUyMHN0ZWFrfGVufDB8fHx8MTc1OTM1Njc0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "flank steak"
    },
    {
      "id": "prod_18",
      "description": "Mojarra Frita con Patacones",
      "imageUrl": "https://images.unsplash.com/photo-1485995768424-01c1ccc33f7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZnJpZWQlMjBmaXNofGVufDB8fHx8MTc1OTM1Njc0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "fried fish"
    },
    {
      "id": "prod_19",
      "description": "Arepa de Huevo",
      "imageUrl": "https://images.unsplash.com/photo-1755603784587-58f19674440f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxlZ2clMjBhcmVwYXxlbnwwfHx8fDE3NTkzNTY3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "egg arepa"
    },
    {
      "id": "prod_20",
      "description": "Mazamorra",
      "imageUrl": "https://images.unsplash.com/photo-1688948871590-0bae803ab305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb3JuJTIwcHVkZGluZ3xlbnwwfHx8fDE3NTkzNTY3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "corn pudding"
    },
    {
      "id": "prod_21",
      "description": "Cholao Valluno",
      "imageUrl": "https://images.unsplash.com/photo-1567206558776-e2a8018bcc2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8c2hhdmVkJTIwaWNlfGVufDB8fHx8MTc1OTM1Njc0OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "shaved ice"
    },
    {
      "id": "prod_22",
      "description": "Oblea con arequipe",
      "imageUrl": "https://images.unsplash.com/photo-1622219773524-eaaa721c760d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3YWZlciUyMGRlc3NlcnR8ZW58MHx8fHwxNzU5MzU2NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "wafer dessert"
    },
    {
      "id": "prod_23",
      "description": "Aguapanela con queso",
      "imageUrl": "https://images.unsplash.com/photo-1565523432734-199ca29c6741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzdWdhciUyMGNhbmUlMjBkcmlua3xlbnwwfHx8fDE3NTkzNTY3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "sugar cane drink"
    },
    {
      "id": "prod_24",
      "description": "Refajo (Beer and soda mix)",
      "imageUrl": "https://images.unsplash.com/photo-1677825949218-608c76ed1fbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxiZWVyJTIwY29ja3RhaWx8ZW58MHx8fHwxNzU5MzU2NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "beer cocktail"
    },
    {
      "id": "prod_25",
      "description": "Café con leche",
      "imageUrl": "https://images.unsplash.com/photo-1687619485715-305c76d06836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb2ZmZWUlMjB3aXRoJTIwbWlsa3xlbnwwfHx8fDE3NTkzNTY3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "coffee with milk"
    },
    {
      "id": "prod_26",
      "description": "Aguardiente Antioqueño bottle",
      "imageUrl": "https://images.unsplash.com/photo-1744233277849-029cd7f525d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxhZ3VhcmRpZW50ZSUyMGJvdHRsZXxlbnwwfHx8fDE3NTkzNTY3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "aguardiente bottle"
    },
    {
      "id": "prod_27",
      "description": "Ron Viejo de Caldas bottle",
      "imageUrl": "https://images.unsplash.com/photo-1583552188783-709c90220745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxydW0lMjBib3R0bGV8ZW58MHx8fHwxNzU5MzU2NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "rum bottle"
    },
    {
      "id": "prod_28",
      "description": "Carimañolas de queso",
      "imageUrl": "https://images.unsplash.com/photo-1748743962749-344529994c78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx5dWNhJTIwZnJpdHRlcnxlbnwwfHx8fDE3NTkzNTY3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "yuca fritter"
    },
    {
      "id": "prod_29",
      "description": "Patacones con hogao",
      "imageUrl": "https://images.unsplash.com/photo-1723763246578-99e614b2a91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxmcmllZCUyMHBsYW50YWluc3xlbnwwfHx8fDE3NTkzNTY3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "fried plantains"
    },
    {
      "id": "prod_30",
      "description": "Cazuela de Mariscos",
      "imageUrl": "https://images.unsplash.com/photo-1668532697413-71a8171089d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzZWFmb29kJTIwY2Fzc2Vyb2xlfGVufDB8fHx8MTc1OTM1Njc0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "seafood casserole"
    },
    {
      "id": "prod_31",
      "description": "Arroz con Coco",
      "imageUrl": "https://images.unsplash.com/photo-1744358399532-9769248a6d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjb2NvbnV0JTIwcmljZXxlbnwwfHx8fDE3NTkzNTY3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "coconut rice"
    },
    {
      "id": "prod_32",
      "description": "Tamal Tolimense",
      "imageUrl": "https://images.unsplash.com/photo-1672412420005-a576c84afab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0YW1hbGUlMjB0b2xpbWVuc2V8ZW58MHx8fHwxNzU5MzU2NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "tamale tolimense"
    },
    {
      "id": "prod_33",
      "description": "Lechona Tolimense",
      "imageUrl": "https://images.unsplash.com/photo-1747999613097-9cb2a0ab5e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8c3R1ZmZlZCUyMHBpZ3xlbnwwfHx8fDE3NTkzNTY3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "stuffed pig"
    },
    {
      "id": "prod_34",
      "description": "Postre de Natas",
      "imageUrl": "https://images.unsplash.com/photo-1702728109878-c61a98d80491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtaWxrJTIwcHVkZGluZ3xlbnwwfHx8fDE3NTkzNTY3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "milk pudding"
    },
    {
      "id": "prod_35",
      "description": "Merengón de Guanabana",
      "imageUrl": "https://images.unsplash.com/photo-1757913350077-1e1e6844d271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzb3Vyc29wJTIwbWVyaW5ndWV8ZW58MHx8fHwxNzU5MzU2NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "soursop meringue"
    },
    {
      "id": "prod_36",
      "description": "Jugo de Maracuyá",
      "imageUrl": "https://images.unsplash.com/photo-1598871265419-c471c1b43a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxwYXNzaW9uJTIwZnJ1aXQlMjBqdWljZXxlbnwwfHx8fDE3NTkzNTY3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "passion fruit juice"
    },
    {
      "id": "prod_37",
      "description": "Jugo de Mora",
      "imageUrl": "https://images.unsplash.com/photo-1747045142277-52f76d35d327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YmxhY2tiZXJyeSUyMGp1aWNlfGVufDB8fHx8MTc1OTM1Njc0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "blackberry juice"
    },
    {
      "id": "prod_38",
      "description": "Café Guayoyo",
      "imageUrl": "https://images.unsplash.com/photo-1613336026275-d6d473084e85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxibGFjayUyMGNvZmZlZXxlbnwwfHx8fDE3NTkzMzkzODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "black coffee"
    },
    {
      "id": "prod_39",
      "description": "Aromática de Frutas",
      "imageUrl": "https://images.unsplash.com/photo-1504382103100-db7e92322d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWF8ZW58MHx8fHwxNzU5MjU0MTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "herbal tea"
    },
    {
      "id": "prod_40",
      "description": "Poker Beer",
      "imageUrl": "https://images.unsplash.com/photo-1751561484311-0ffe32975b02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb2tlciUyMGJlZXJ8ZW58MHx8fHwxNzU5MzU2NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "poker beer"
    },
    {
      "id": "prod_41",
      "description": "Aguila Beer",
      "imageUrl": "https://images.unsplash.com/photo-1651421977835-9e5403dedac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxhZ3VpbGElMjBiZWVyfGVufDB8fHx8MTc1OTM1Njc0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "aguila beer"
    }
  ]
}
```

---
---

### Archivo: `src/lib/user-avatar.tsx`

```tsx
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "./utils";
import { Smile, Star, Heart } from "lucide-react";
import type { User } from "./placeholder-data";

export const defaultAvatars = [
    { id: 'smile-icon', icon: <Smile className="w-10 h-10" /> },
    { id: 'star-icon', icon: <Star className="w-10 h-10" /> },
    { id: 'heart-icon', icon: <Heart className="w-10 h-10" /> },
];

export const renderAvatar = (user: User, large: boolean = false) => {
    const sizeClass = large ? "h-20 w-20" : "h-10 w-10";
    const currentAvatarUrl = user.avatarUrl;
    const currentZoom = user.avatarZoom || 1;

    if (currentAvatarUrl.startsWith('default:')) {
        const avatarId = currentAvatarUrl.split(':')[1];
        const avatar = defaultAvatars.find(a => a.id === avatarId);
        return avatar ? (
            <Avatar className={sizeClass}>
                <AvatarFallback className="bg-muted text-muted-foreground">
                    {React.cloneElement(avatar.icon, {className: large ? "w-10 h-10" : "w-5 h-5"})}
                </AvatarFallback>
            </Avatar>
        ) : <AvatarImage src={undefined} alt={user.name} />;
    }
    return (
        <Avatar className={cn(sizeClass, "overflow-hidden")}>
            <AvatarImage 
                src={currentAvatarUrl} 
                alt={user.name} 
                style={{ transform: `scale(${currentZoom})`, objectFit: 'cover', width: '100%', height: '100%' }}
            />
             <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
    );
};
```

---
---

### Archivo: `src/lib/user-data.ts`

```ts
import { User } from './placeholder-data';

export const defaultUsers: User[] = [
    {
        id: 'user_1',
        name: 'Ana García (Admin)',
        email: 'admin@commerceflow.com',
        role: 'Administrador',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        status: 'Activo',
        password: 'password123',
        avatarZoom: 1.2
    },
    {
        id: 'user_2',
        name: 'Carlos Rodriguez',
        email: 'carlos@commerceflow.com',
        role: 'Mesero',
        avatarUrl: 'default:star-icon',
        status: 'Activo',
        password: 'password123',
        avatarZoom: 1
    },
    {
        id: 'user_3',
        name: 'Beatriz "Betty" Pinzón',
        email: 'beatriz@commerceflow.com',
        role: 'Cajero',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
        status: 'Activo',
        password: 'password123',
        avatarZoom: 1
    },
    {
        id: 'user_4',
        name: 'Daniel Valencia',
        email: 'daniel@commerceflow.com',
        role: 'Vendedor',
        avatarUrl: 'https://i.pravatar.cc/150?img=4',
        status: 'Ausente',
        password: 'password123',
        avatarZoom: 1
    },
    {
        id: 'user_5',
        name: 'Patricia Fernández',
        email: 'patricia@commerceflow.com',
        role: 'Mesero',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
        status: 'Ocupado',
        password: 'password123',
        avatarZoom: 1
    },
     {
        id: 'user_6',
        name: 'Armando Mendoza',
        email: 'armando@commerceflow.com',
        role: 'Bartender',
        avatarUrl: 'https://i.pravatar.cc/150?img=6',
        status: 'Activo',
        password: 'password123',
        avatarZoom: 1
    },
    {
        id: 'user_7',
        name: 'Marcela Valencia',
        email: 'marcela@commerceflow.com',
        role: 'Mesero',
        avatarUrl: 'https://i.pravatar.cc/150?img=7',
        status: 'Inactivo',
        password: 'password123',
        avatarZoom: 1.5
    },
    {
        id: 'user_8',
        name: 'Hugo Lombardi',
        email: 'hugo@commerceflow.com',
        role: 'Bartender',
        avatarUrl: 'default:heart-icon',
        status: 'Activo',
        password: 'password123',
        avatarZoom: 1
    },
     {
        id: 'user_9',
        name: 'Inesita',
        email: 'inesita@commerceflow.com',
        role: 'Vendedor',
        avatarUrl: 'https://i.pravatar.cc/150?img=9',
        status: 'Activo',
        password: 'password123',
        avatarZoom: 1
    },
     {
        id: 'user_10',
        name: 'Freddy Stewart',
        email: 'freddy@commerceflow.com',
        role: 'Cajero',
        avatarUrl: 'https://i.pravatar.cc/150?img=10',
        status: 'Activo',
        password: 'password123',
        avatarZoom: 1
    },
     {
        id: 'user_11',
        name: 'Aura María Fuentes',
        email: 'auramaria@commerceflow.com',
        role: 'Mesero',
        avatarUrl: 'https://i.pravatar.cc/150?img=11',
        status: 'Activo',
        password: 'password123',
        avatarZoom: 1
    },
     {
        id: 'user_12',
        name: 'Mario Calderón',
        email: 'mario@commerceflow.com',
        role: 'Vendedor',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
        status: 'Ausente',
        password: 'password123',
        avatarZoom: 1
    }
];
```

---
---

### Archivo: `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---
---

### Archivo: `src/package.json`

```json
{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "NODE_ENV=production next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@genkit-ai/google-genai": "^1.20.0",
    "@genkit-ai/next": "^1.20.0",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^11.9.1",
    "genkit": "^1.20.0",
    "lucide-react": "^0.475.0",
    "next": "15.3.3",
    "patch-package": "^8.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "genkit-cli": "^1.20.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

---
---

### Archivo: `src/services/order-service.ts`

```ts
'use server';

import { products, type Order, type Product } from '@/lib/placeholder-data';
import initialOrdersData from './orders.json';
import fs from 'fs';
import path from 'path';

export type OrderItem = {
    productId: string;
    quantity: number;
    notes?: string;
};

export type NewOrderInput = {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: OrderItem[];
    userId?: string;
    tip?: number;
    paymentMethod?: 'Efectivo' | 'Tarjeta' | 'Transferencia';
    status?: Order['status'];
};

const ordersFilePath = path.join(process.cwd(), 'src/services', 'orders.json');

// Helper function to read orders from the JSON file
const readOrdersFromFile = (): Order[] => {
    try {
        if (fs.existsSync(ordersFilePath)) {
            const fileContent = fs.readFileSync(ordersFilePath, 'utf-8');
            const orders = JSON.parse(fileContent) as any[];
            return orders.map(order => {
                const items = order.items.map((item: any) => ({
                    ...item,
                    product: findProduct(item.product.id)
                })).filter((item: any) => item.product); // Filter out items where product wasn't found

                if (items.length !== order.items.length) {
                    console.warn(`Order ${order.id} contained items with missing products.`);
                }

                return {
                    ...order,
                    items: items
                };
            });
        }
    } catch (error) {
        console.error("Error reading from orders.json, falling back to initial data:", error);
    }
    return initialOrdersData.map(order => ({
        ...order,
        items: order.items.map((item: any) => ({
            ...item,
            product: findProduct(item.product.id)
        }))
    })) as Order[];
};

// Helper function to write orders to the JSON file
const writeOrdersToFile = (orders: Order[]) => {
    try {
        const ordersToStore = orders.map(order => ({
            ...order,
            items: order.items.map(item => ({
                quantity: item.quantity,
                product: { id: item.product.id }
            }))
        }));
        fs.writeFileSync(ordersFilePath, JSON.stringify(ordersToStore, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error writing to orders.json:", error);
    }
};

function findProduct(productId: string) : Product | undefined {
    return products.find(p => p.id === productId);
}

/**
 * Creates a new order and stores it.
 * @param orderInput The details for the new order.
 * @returns The ID of the newly created order.
 */
export async function createOrder(orderInput: NewOrderInput): Promise<string> {
    const inMemoryOrders = readOrdersFromFile();
    const orderId = `ORD-${String(Date.now()).slice(-4)}`;
    
    const processedItems = orderInput.items.map(item => {
        const product = findProduct(item.productId);
        if (!product) throw new Error(`Product with id ${item.productId} not found.`);
        return {
            product,
            quantity: item.quantity,
        };
    });

    const subtotal = processedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.19;
    const tip = orderInput.tip || 0;
    const total = subtotal + tax + tip;
    const profit = processedItems.reduce((acc, item) => acc + (item.product.price - item.product.cost) * item.quantity, 0);

    const type = orderInput.customerAddress === 'En local' ? 'En local' : 'A domicilio';

    const newOrder: Order = {
        id: orderId,
        customerName: orderInput.customerName,
        items: processedItems,
        total,
        subtotal,
        tax,
        tip,
        profit,
        status: orderInput.status || 'Pendiente',
        createdAt: new Date().toISOString(),
        type: type,
        userId: orderInput.userId,
        paymentMethod: orderInput.paymentMethod || 'Efectivo',
    };

    inMemoryOrders.unshift(newOrder);
    writeOrdersToFile(inMemoryOrders);

    return orderId;
}

/**
 * Retrieves the status of an existing order.
 * @param orderId The ID of the order to check.
 * @returns A string describing the order status.
 */
export async function getOrderStatus(orderId: string): Promise<string> {
    const inMemoryOrders = readOrdersFromFile();
    const order = inMemoryOrders.find(o => o.id.toLowerCase() === orderId.toLowerCase());

    if (!order) {
        return `Lo siento, no pude encontrar un pedido con el código "${orderId}". Por favor, verifica el código.`;
    }

    return `El estado de tu pedido ${orderId} es: ${order.status}.`;
}

/**
 * Retrieves all orders.
 * @returns An array of all orders.
 */
export async function getOrders(): Promise<Order[]> {
    return readOrdersFromFile();
}


/**
 * Updates the status of an existing order.
 * @param orderId The ID of the order to update.
 * @param status The new status for the order.
 * @param paymentMethod Optional payment method when status is 'Pagado'
 * @returns A boolean indicating success.
 */
export async function updateOrderStatus(orderId: string, status: Order['status'], paymentMethod?: 'Efectivo' | 'Tarjeta' | 'Transferencia'): Promise<boolean> {
    const inMemoryOrders = readOrdersFromFile();
    const orderIndex = inMemoryOrders.findIndex(o => o.id.toLowerCase() === orderId.toLowerCase());

    if (orderIndex === -1) {
        console.warn(`Order with ID ${orderId} not found for status update.`);
        return false;
    }

    inMemoryOrders[orderIndex].status = status;
    if (status === 'Pagado' && paymentMethod) {
        inMemoryOrders[orderIndex].paymentMethod = paymentMethod;
    }
    
    writeOrdersToFile(inMemoryOrders);
    console.log(`Order ${orderId} status updated to ${status}`);
    return true;
}

/**
 * Updates the items of an existing order.
 * @param orderId The ID of the order to update.
 * @param items The new list of items for the order.
 * @param customerName Optional new customer name.
 * @returns A boolean indicating success.
 */
export async function updateOrderItems(orderId: string, items: OrderItem[], customerName?: string): Promise<boolean> {
    const inMemoryOrders = readOrdersFromFile();
    const orderIndex = inMemoryOrders.findIndex(o => o.id.toLowerCase() === orderId.toLowerCase());

    if (orderIndex === -1) {
        console.warn(`Order with ID ${orderId} not found for item update.`);
        return false;
    }

    const processedItems = items.map(item => {
        const product = findProduct(item.productId);
        if (!product) throw new Error(`Product with id ${item.productId} not found.`);
        return {
            product,
            quantity: item.quantity,
        };
    });

    const subtotal = processedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.19;
    const existingTip = inMemoryOrders[orderIndex].tip || 0;
    const total = subtotal + tax + existingTip;
    const profit = processedItems.reduce((acc, item) => acc + (item.product.price - item.product.cost) * item.quantity, 0);

    inMemoryOrders[orderIndex].items = processedItems;
    inMemoryOrders[orderIndex].total = total;
    inMemoryOrders[orderIndex].subtotal = subtotal;
    inMemoryOrders[orderIndex].tax = tax;
    inMemoryOrders[orderIndex].profit = profit;

    if (customerName) {
        inMemoryOrders[orderIndex].customerName = customerName;
    }
    
    writeOrdersToFile(inMemoryOrders);
    console.log(`Order ${orderId} items updated.`);
    return true;
}
```

---
---

### Archivo: `src/services/orders.json`

```json
[
  {
    "id": "ORD-4390",
    "customerName": "Cristian",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_10"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_4"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_36"
        }
      }
    ],
    "total": 57120,
    "subtotal": 48000,
    "tax": 9120,
    "tip": 0,
    "profit": 27000,
    "status": "Pendiente",
    "createdAt": "2025-10-03T03:11:24.391Z",
    "type": "A domicilio",
    "paymentMethod": "Efectivo"
  },
  {
    "id": "ORD-2370",
    "customerName": "Cliente de Mostrador",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_14"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_13"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_29"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_16"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_10"
        }
      }
    ],
    "total": 92820,
    "subtotal": 78000,
    "tax": 14820,
    "tip": 0,
    "profit": 44000,
    "status": "Pagado",
    "createdAt": "2025-10-02T03:16:52.370Z",
    "type": "En local",
    "userId": "user_1",
    "paymentMethod": "Efectivo"
  },
  {
    "id": "ORD-9432",
    "customerName": "mesa 1",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_13"
        }
      },
      {
        "quantity": 4,
        "product": {
          "id": "prod_29"
        }
      },
      {
        "quantity": 3,
        "product": {
          "id": "prod_9"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_15"
        }
      }
    ],
    "total": 140420,
    "subtotal": 118000,
    "tax": 22420,
    "tip": 0,
    "profit": 68000,
    "status": "Pendiente",
    "createdAt": "2025-10-02T02:55:19.432Z",
    "type": "En local",
    "userId": "user_1",
    "paymentMethod": "Efectivo"
  },
  {
    "id": "ORD-0102",
    "customerName": "Cristian Garcia",
    "items": [
      {
        "quantity": 3,
        "product": {
          "id": "prod_41"
        }
      },
      {
        "quantity": 3,
        "product": {
          "id": "prod_7"
        }
      }
    ],
    "total": 33915,
    "subtotal": 28500,
    "tax": 5415,
    "tip": 0,
    "profit": 14400,
    "status": "Pendiente",
    "createdAt": "2025-10-02T02:31:40.102Z",
    "type": "A domicilio",
    "paymentMethod": "Efectivo"
  },
  {
    "id": "ORD-0099",
    "customerName": "Cristian Garcia",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_18"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_37"
        }
      }
    ],
    "total": 44030,
    "subtotal": 37000,
    "tax": 7030,
    "tip": 0,
    "profit": 20000,
    "status": "Pagado",
    "createdAt": "2025-10-02T02:31:40.099Z",
    "type": "A domicilio",
    "paymentMethod": "Transferencia"
  },
  {
    "id": "ORD-0097",
    "customerName": "Cristian Garcia",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_8"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_3"
        }
      }
    ],
    "total": 11305,
    "subtotal": 9500,
    "tax": 1805,
    "tip": 0,
    "profit": 5300,
    "status": "Pendiente",
    "createdAt": "2025-10-02T02:31:40.097Z",
    "type": "A domicilio",
    "paymentMethod": "Efectivo"
  },
  {
    "id": "ORD-0094",
    "customerName": "Cristian Garcia",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_10"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_12"
        }
      }
    ],
    "total": 41650,
    "subtotal": 35000,
    "tax": 6650,
    "tip": 0,
    "profit": 19000,
    "status": "Pendiente",
    "createdAt": "2025-10-02T02:31:40.094Z",
    "type": "A domicilio",
    "paymentMethod": "Efectivo"
  },
  {
    "id": "ORD-0093",
    "customerName": "Cristian Garcia",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_9"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_36"
        }
      }
    ],
    "total": 27370,
    "subtotal": 23000,
    "tax": 4370,
    "tip": 0,
    "profit": 13000,
    "status": "Pendiente",
    "createdAt": "2025-10-02T02:31:40.093Z",
    "type": "A domicilio",
    "paymentMethod": "Efectivo"
  },
  {
    "id": "ORD-1370",
    "customerName": "cristian garcia",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_16"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_12"
        }
      }
    ],
    "total": 34510,
    "subtotal": 29000,
    "tax": 5510,
    "tip": 0,
    "profit": 16000,
    "status": "Pagado",
    "createdAt": "2025-10-02T01:48:21.371Z",
    "type": "A domicilio",
    "paymentMethod": "Transferencia"
  },
  {
    "id": "ORD-6875",
    "customerName": "Cliente de Mostrador",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_14"
        }
      }
    ],
    "total": 8330,
    "subtotal": 7000,
    "tax": 1330,
    "tip": 0,
    "profit": 4500,
    "status": "Pagado",
    "createdAt": "2025-10-02T00:32:36.875Z",
    "type": "En local",
    "userId": "user_1",
    "paymentMethod": "Transferencia"
  },
  {
    "id": "ORD-6174",
    "customerName": "mesa 1",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_29"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_15"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_9"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_30"
        }
      }
    ],
    "total": 115430,
    "subtotal": 97000,
    "tax": 18430,
    "tip": 0,
    "profit": 53500,
    "status": "Pagado",
    "createdAt": "2025-10-02T00:20:06.174Z",
    "type": "En local",
    "userId": "user_1",
    "paymentMethod": "Efectivo"
  },
  {
    "id": "ORD-9157",
    "customerName": "Cliente de Mostrador",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_13"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_29"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_28"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_15"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_9"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_16"
        }
      }
    ],
    "total": 95795,
    "subtotal": 80500,
    "tax": 15295,
    "tip": 0,
    "profit": 45800,
    "status": "Pagado",
    "createdAt": "2025-10-01T23:08:29.157Z",
    "type": "En local",
    "userId": "user_1",
    "paymentMethod": "Transferencia"
  },
  {
    "id": "ORD-2970",
    "customerName": "mesa 3",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_13"
        }
      },
      {
        "quantity": 4,
        "product": {
          "id": "prod_9"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_15"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_18"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_30"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_17"
        }
      }
    ],
    "total": 264180,
    "subtotal": 222000,
    "tax": 42180,
    "tip": 0,
    "profit": 121000,
    "status": "Pagado",
    "createdAt": "2025-10-01T23:07:12.970Z",
    "type": "En local",
    "userId": "user_1",
    "paymentMethod": "Transferencia"
  },
  {
    "id": "ORD-0737",
    "customerName": "mesa 1",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_13"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_29"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_9"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_11"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_6"
        }
      }
    ],
    "total": 96390,
    "subtotal": 81000,
    "tax": 15390,
    "tip": 0,
    "profit": 47000,
    "status": "Pagado",
    "createdAt": "2025-10-01T23:07:00.737Z",
    "type": "En local",
    "userId": "user_1",
    "paymentMethod": "Transferencia"
  },
  {
    "id": "ORD-7888",
    "customerName": "mesa 1",
    "items": [
      {
        "quantity": 3,
        "product": {
          "id": "prod_15"
        }
      },
      {
        "quantity": 3,
        "product": {
          "id": "prod_9"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_29"
        }
      }
    ],
    "total": 142800,
    "subtotal": 120000,
    "tax": 22800,
    "tip": 0,
    "profit": 68000,
    "status": "Pagado",
    "createdAt": "2025-10-01T23:02:27.888Z",
    "type": "En local",
    "userId": "user_1"
  },
  {
    "id": "ORD-9227",
    "customerName": "mesa 11",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_13"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_28"
        }
      },
      {
        "quantity": 4,
        "product": {
          "id": "prod_11"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_9"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_14"
        }
      }
    ],
    "total": 83895,
    "subtotal": 70500,
    "tax": 13395,
    "tip": 0,
    "profit": 41800,
    "status": "Pagado",
    "createdAt": "2025-10-01T23:02:09.227Z",
    "type": "En local",
    "userId": "user_1"
  },
  {
    "id": "ORD-9837",
    "customerName": "mesa 8",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_29"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_28"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_6"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_9"
        }
      }
    ],
    "total": 76160,
    "subtotal": 64000,
    "tax": 12160,
    "tip": 0,
    "profit": 37100,
    "status": "Pagado",
    "createdAt": "2025-10-01T23:01:59.838Z",
    "type": "En local",
    "userId": "user_1"
  },
  {
    "id": "ORD-6882",
    "customerName": "mesa 3",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_13"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_29"
        }
      }
    ],
    "total": 24990,
    "subtotal": 21000,
    "tax": 3990,
    "tip": 0,
    "profit": 12500,
    "status": "Pagado",
    "createdAt": "2025-10-01T23:00:06.882Z",
    "type": "En local",
    "userId": "user_1"
  },
  {
    "id": "ORD-4551",
    "customerName": "Cliente de Mostrador",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_13"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_15"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_9"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_29"
        }
      },
      {
        "quantity": 3,
        "product": {
          "id": "prod_28"
        }
      }
    ],
    "total": 89636.75,
    "subtotal": 65500,
    "tax": 12445,
    "tip": 11691.75,
    "profit": 38400,
    "status": "Pagado",
    "createdAt": "2025-10-01T22:58:14.551Z",
    "type": "En local",
    "userId": "user_1",
    "paymentMethod": "Tarjeta"
  },
  {
    "id": "ORD-5832",
    "customerName": "Mesa 5",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_10"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_24"
        }
      }
    ],
    "total": 46410,
    "subtotal": 39000,
    "tax": 7410,
    "tip": 0,
    "profit": 18000,
    "status": "Pagado",
    "createdAt": "2024-10-20T19:30:00Z",
    "type": "En local",
    "userId": "user_1"
  },
  {
    "id": "ORD-1945",
    "customerName": "Cliente Mostrador",
    "items": [
      {
        "quantity": 4,
        "product": {
          "id": "prod_11"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_37"
        }
      }
    ],
    "total": 26180,
    "subtotal": 22000,
    "tax": 4180,
    "tip": 2200,
    "profit": 8000,
    "status": "Pagado",
    "createdAt": "2024-10-19T12:00:00Z",
    "type": "Para llevar",
    "userId": "user_10"
  },
  {
    "id": "ORD-8274",
    "customerName": "Familia Ramirez",
    "items": [
      {
        "quantity": 2,
        "product": {
          "id": "prod_16"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_9"
        }
      },
      {
        "quantity": 3,
        "product": {
          "id": "prod_36"
        }
      }
    ],
    "total": 91630,
    "subtotal": 77000,
    "tax": 14630,
    "tip": 7700,
    "profit": 34000,
    "status": "Pagado",
    "createdAt": "2024-10-18T14:00:00Z",
    "type": "En local",
    "userId": "user_2"
  },
  {
    "id": "ORD-3019",
    "customerName": "Rappi 85736",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_18"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_12"
        }
      }
    ],
    "total": 46410,
    "subtotal": 39000,
    "tax": 7410,
    "tip": 0,
    "profit": 18000,
    "status": "Pagado",
    "createdAt": "2024-10-20T20:15:00Z",
    "type": "A domicilio",
    "userId": "user_4"
  },
  {
    "id": "ORD-4823",
    "customerName": "Mesa 2",
    "items": [
      {
        "quantity": 4,
        "product": {
          "id": "prod_7"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_13"
        }
      }
    ],
    "total": 38080,
    "subtotal": 32000,
    "tax": 6080,
    "tip": 3200,
    "profit": 15000,
    "status": "Pagado",
    "createdAt": "2024-09-15T18:00:00Z",
    "type": "En local",
    "userId": "user_7"
  },
  {
    "id": "ORD-6758",
    "customerName": "Mesa 8",
    "items": [
      {
        "quantity": 2,
        "product": {
          "id": "prod_26"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_27"
        }
      }
    ],
    "total": 35700,
    "subtotal": 30000,
    "tax": 5700,
    "tip": 0,
    "profit": 13000,
    "status": "Pagado",
    "createdAt": "2024-09-10T22:00:00Z",
    "type": "En local",
    "userId": "user_8"
  },
  {
    "id": "ORD-9264",
    "customerName": "Mesa 1",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_1"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_3"
        }
      }
    ],
    "total": 13090,
    "subtotal": 11000,
    "tax": 2090,
    "tip": 1100,
    "profit": 4700,
    "status": "Pagado",
    "createdAt": "2024-10-20T20:30:00Z",
    "type": "En local",
    "userId": "user_3",
    "paymentMethod": "Transferencia"
  },
  {
    "id": "ORD-1122",
    "customerName": "Mesa 12",
    "items": [
      {
        "quantity": 2,
        "product": {
          "id": "prod_33"
        }
      },
      {
        "quantity": 4,
        "product": {
          "id": "prod_40"
        }
      }
    ],
    "total": 80920,
    "subtotal": 68000,
    "tax": 12920,
    "tip": 6800,
    "profit": 30800,
    "status": "Pagado",
    "createdAt": "2024-10-15T15:00:00Z",
    "type": "En local",
    "userId": "user_5"
  },
  {
    "id": "ORD-3344",
    "customerName": "Cliente Mostrador",
    "items": [
      {
        "quantity": 2,
        "product": {
          "id": "prod_19"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_38"
        }
      }
    ],
    "total": 16660,
    "subtotal": 14000,
    "tax": 2660,
    "tip": 0,
    "profit": 5000,
    "status": "Pagado",
    "createdAt": "2024-10-12T09:00:00Z",
    "type": "Para llevar",
    "userId": "user_11"
  },
  {
    "id": "ORD-5566",
    "customerName": "Mesa 7",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_30"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_4"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_21"
        }
      }
    ],
    "total": 61880,
    "subtotal": 52000,
    "tax": 9880,
    "tip": 5200,
    "profit": 24000,
    "status": "Pagado",
    "createdAt": "2024-09-01T13:00:00Z",
    "type": "En local",
    "userId": "user_6"
  },
  {
    "id": "ORD-7788",
    "customerName": "Mesa 4",
    "items": [
      {
        "quantity": 6,
        "product": {
          "id": "prod_41"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_34"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_22"
        }
      },
      {
        "quantity": 3,
        "product": {
          "id": "prod_21"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_20"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_8"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_2"
        }
      }
    ],
    "total": 99685,
    "subtotal": 81500,
    "tax": 15485,
    "tip": 2700,
    "profit": 45900,
    "status": "Pagado",
    "createdAt": "2024-10-20T20:25:00Z",
    "type": "En local",
    "userId": "user_9",
    "paymentMethod": "Tarjeta"
  },
  {
    "id": "ORD-9900",
    "customerName": "Mesa 9",
    "items": [
      {
        "quantity": 2,
        "product": {
          "id": "prod_35"
        }
      },
      {
        "quantity": 2,
        "product": {
          "id": "prod_25"
        }
      }
    ],
    "total": 29750,
    "subtotal": 25000,
    "tax": 4750,
    "tip": 2500,
    "profit": 11400,
    "status": "Pagado",
    "createdAt": "2024-09-25T16:00:00Z",
    "type": "En local",
    "userId": "user_12"
  },
  {
    "id": "ORD-2345",
    "customerName": "Didi Food 12345",
    "items": [
      {
        "quantity": 2,
        "product": {
          "id": "prod_32"
        }
      }
    ],
    "total": 35700,
    "subtotal": 30000,
    "tax": 5700,
    "tip": 0,
    "profit": 12000,
    "status": "Pagado",
    "createdAt": "2024-09-22T20:00:00Z",
    "type": "A domicilio",
    "userId": "user_4"
  },
  {
    "id": "ORD-6789",
    "customerName": "Mesa 11",
    "items": [
      {
        "quantity": 1,
        "product": {
          "id": "prod_17"
        }
      },
      {
        "quantity": 1,
        "product": {
          "id": "prod_6"
        }
      }
    ],
    "total": 45220,
    "subtotal": 38000,
    "tax": 7220,
    "tip": 3800,
    "profit": 17000,
    "status": "Pagado",
    "createdAt": "2024-09-20T19:00:00Z",
    "type": "En local",
    "userId": "user_1"
  }
]
```

---
---

### Archivo: `tailwind.config.ts`

```ts
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

---
---

### Archivo: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```