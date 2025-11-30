# 🗺️ Configuración de Google Maps API

## 📋 Guía Completa para Integrar Google Maps

### ✅ Estado Actual
- ✅ Librería instalada: `@react-google-maps/api`
- ✅ Componente GoogleMap creado
- ✅ Integrado en ContactSection
- ⚠️ **Pendiente:** Configurar API Key

---

## 🔑 Paso 1: Obtener tu API Key de Google Maps

### **1. Crear un Proyecto en Google Cloud**

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Si es tu primera vez, acepta los términos de servicio
3. Click en **"Seleccionar proyecto"** → **"Nuevo proyecto"**
4. Asigna un nombre: `Ortomediq Maps` (o el que prefieras)
5. Click en **"Crear"**

### **2. Habilitar la API de Google Maps**

1. En el menú lateral, ve a **"APIs y servicios"** → **"Biblioteca"**
2. Busca: **"Maps JavaScript API"**
3. Click en la API
4. Click en **"Habilitar"**

### **3. Crear Credenciales (API Key)**

1. Ve a **"APIs y servicios"** → **"Credenciales"**
2. Click en **"Crear credenciales"** → **"Clave de API"**
3. Se generará tu API Key
4. **⚠️ MUY IMPORTANTE:** Click en **"Restringir clave"**

### **4. Configurar Restricciones (Seguridad)**

#### **Restricciones de la aplicación:**
- Selecciona: **"Referentes de HTTP (sitios web)"**
- Agrega tus dominios permitidos:
  ```
  http://localhost:*
  http://localhost:5173/*
  http://localhost:5174/*
  https://tu-dominio.com/*
  https://www.tu-dominio.com/*
  ```

#### **Restricciones de la API:**
- Selecciona: **"Restringir clave"**
- Marca solo: **"Maps JavaScript API"**

5. Click en **"Guardar"**

### **5. Copiar tu API Key**
```
Ejemplo: AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## ⚙️ Paso 2: Configurar en tu Proyecto

### **1. Crear archivo `.env`**

En la raíz del proyecto (mismo nivel que `package.json`), crea un archivo llamado `.env`:

```bash
# .env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ Reemplaza con tu API Key real**

### **2. Verificar `.gitignore`**

Asegúrate de que `.env` esté en tu `.gitignore` para no subir la API Key a GitHub:

```gitignore
# .gitignore
.env
.env.local
.env.*.local
```

### **3. Crear `.env.example` (Opcional)**

Para que otros desarrolladores sepan qué variables necesitan:

```bash
# .env.example
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

---

## 📍 Paso 3: Configurar Coordenadas de tu Negocio

### **1. Obtener Coordenadas Exactas**

**Opción A: Usar Google Maps**
1. Ve a [Google Maps](https://www.google.com/maps)
2. Busca tu dirección exacta
3. Click derecho en el marcador
4. Click en las coordenadas para copiarlas
5. Ejemplo: `25.5428, -103.4068`

**Opción B: Usar la búsqueda de direcciones**
1. Ve a [Google Maps](https://www.google.com/maps)
2. Busca: `Av. Principal #123, Torreón, Coahuila`
3. En la URL verás: `@25.5428,-103.4068`

### **2. Actualizar en `ContactSection.jsx`**

```jsx
// src/components/home/ContactSection.jsx

const mapCenter = {
  lat: 25.5428,  // ← Reemplaza con tu latitud
  lng: -103.4068 // ← Reemplaza con tu longitud
}
```

### **3. Actualizar Dirección Física**

También actualiza la dirección en el mismo archivo:

```jsx
<p className="text-gray-600">
  Av. Principal #123<br />  {/* ← Tu dirección real */}
  Torreón, Coahuila, México
</p>
```

---

## 🚀 Paso 4: Reiniciar el Servidor

```bash
# Detener el servidor (Ctrl + C)
# Reiniciar
npm run dev
```

**⚠️ IMPORTANTE:** Vite requiere reiniciar el servidor después de modificar `.env`

---

## ✅ Verificar que Funciona

1. Ve a `http://localhost:5174` (o tu puerto)
2. Navega a la sección de **Contacto**
3. Deberías ver:
   - ✅ Mapa de Google Maps interactivo
   - ✅ Marcador en tu ubicación
   - ✅ Controles de zoom
   - ✅ Botón "Ver en Google Maps"

---

## 🎨 Personalizar el Mapa

### **Opciones del Componente GoogleMap**

En `ContactSection.jsx`, puedes ajustar:

```jsx
<GoogleMapComponent 
  apiKey={googleMapsApiKey}
  center={mapCenter}
  zoom={16}          // ← Nivel de zoom (1-20)
  height="384px"     // ← Altura del mapa
/>
```

### **Niveles de Zoom Recomendados:**
- `zoom={12}` - Vista de ciudad
- `zoom={15}` - Vista de vecindario
- `zoom={16}` - Vista de calle (recomendado)
- `zoom={18}` - Vista muy cercana

### **Cambiar Altura del Mapa:**
```jsx
height="400px"  // Más alto
height="300px"  // Más bajo
height="500px"  // Muy alto
```

---

## 🔧 Componente GoogleMap

### **Ubicación:** `src/components/common/GoogleMap.jsx`

### **Props:**
| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `apiKey` | string | required | Tu API Key de Google Maps |
| `center` | object | `{lat, lng}` | Coordenadas del centro |
| `zoom` | number | `15` | Nivel de zoom (1-20) |
| `height` | string | `'400px'` | Altura del mapa |

### **Características:**
- ✅ Muestra placeholder si no hay API Key
- ✅ Maneja errores de carga
- ✅ Marcador personalizado
- ✅ Controles de navegación
- ✅ Responsive

---

## 🎯 Estados del Mapa

### **1. Sin API Key**
Muestra un placeholder visual indicando que falta configurar la API Key:
```
┌────────────────────────┐
│       🗺️              │
│   Google Maps          │
│ Configura tu API Key   │
│  en el archivo .env    │
└────────────────────────┘
```

### **2. Error al Cargar**
Si la API Key es inválida, muestra un mensaje de error:
```
┌────────────────────────┐
│       ⚠️              │
│ Error al cargar mapa   │
│ Verifica tu API Key    │
└────────────────────────┘
```

### **3. Mapa Cargado**
Muestra el mapa interactivo de Google Maps con:
- ✅ Vista de la ubicación
- ✅ Marcador en el punto
- ✅ Controles de zoom
- ✅ Vista de calle disponible

---

## 💰 Costos de Google Maps API

### **Cuota Gratuita Mensual:**
- **$200 USD en créditos** cada mes
- Equivale a aproximadamente **28,000 cargas de mapa** al mes
- **Más que suficiente** para un sitio web pequeño/mediano

### **¿Necesito Tarjeta de Crédito?**
- Sí, Google requiere una tarjeta para activar la API
- No se cobrará hasta que superes los $200 USD mensuales
- Puedes configurar alertas de presupuesto

### **Cómo Evitar Cargos:**
1. Restringir la API Key (solo tu dominio)
2. Limitar las APIs habilitadas
3. Configurar alertas de presupuesto en Google Cloud
4. El tráfico normal de un sitio web **nunca supera** la cuota gratuita

---

## 🔒 Seguridad: Mejores Prácticas

### **1. Nunca Subas tu API Key a GitHub**
```bash
# Verificar que .env esté en .gitignore
git status
# No debería aparecer .env
```

### **2. Restringir Dominios**
Solo permite tu dominio en las restricciones de la API Key

### **3. Restringir APIs**
Solo habilita "Maps JavaScript API" (no otras APIs innecesarias)

### **4. Monitorear Uso**
Revisa mensualmente el uso en Google Cloud Console

---

## 🐛 Troubleshooting (Solución de Problemas)

### **Problema: "This page can't load Google Maps correctly"**
**Solución:**
1. Verifica que tu API Key esté bien copiada en `.env`
2. Reinicia el servidor: `npm run dev`
3. Verifica que habilitaste "Maps JavaScript API"
4. Revisa las restricciones de dominio

### **Problema: El mapa no aparece (placeholder visible)**
**Solución:**
1. Asegúrate de que el archivo `.env` existe en la raíz
2. Verifica el nombre de la variable: `VITE_GOOGLE_MAPS_API_KEY`
3. Reinicia el servidor después de crear `.env`

### **Problema: "RefererNotAllowedMapError"**
**Solución:**
1. Ve a Google Cloud Console
2. Edita las restricciones de la API Key
3. Agrega `http://localhost:*` a los referentes permitidos

### **Problema: El mapa se ve gris**
**Solución:**
1. Verifica que habilitaste "Maps JavaScript API"
2. Espera unos minutos (puede tardar en activarse)
3. Verifica que tu cuenta de Google Cloud esté activa

---

## 📝 Checklist de Configuración

- [ ] Crear proyecto en Google Cloud Console
- [ ] Habilitar "Maps JavaScript API"
- [ ] Crear API Key
- [ ] Configurar restricciones de seguridad
- [ ] Crear archivo `.env` en la raíz del proyecto
- [ ] Agregar `VITE_GOOGLE_MAPS_API_KEY=tu_key`
- [ ] Verificar que `.env` está en `.gitignore`
- [ ] Obtener coordenadas exactas de tu negocio
- [ ] Actualizar coordenadas en `ContactSection.jsx`
- [ ] Actualizar dirección física en `ContactSection.jsx`
- [ ] Reiniciar servidor de desarrollo
- [ ] Verificar que el mapa carga correctamente

---

## 📚 Recursos Adicionales

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [React Google Maps API Docs](https://react-google-maps-api-docs.netlify.app/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Calculadora de Precios](https://mapsplatform.google.com/pricing/)

---

## 🎉 ¡Listo!

Una vez configurado, tendrás:
- ✅ Mapa interactivo de Google Maps
- ✅ Marcador en tu ubicación exacta
- ✅ Botón para abrir en Google Maps app
- ✅ Diseño responsive
- ✅ Manejo de errores
- ✅ Seguridad implementada

**¡Tu sección de contacto ahora es completamente funcional con Google Maps!** 🗺️✨



