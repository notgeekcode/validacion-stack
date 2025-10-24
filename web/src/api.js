// api.js
// Punto único de configuración de API. Lee la URL desde variable de entorno de Vite.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function http(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  // algunos endpoints 201 no devuelven body; intentamos json y si falla devolvemos null
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export const api = {
  // Comercios
  listarComercios: () => http("/comercios"),
  crearComercio: (data) => http("/comercios", { method: "POST", body: JSON.stringify(data) }),

  // Eventos
  listarEventos: () => http("/eventos"),
  crearEvento: (data) => http("/eventos", { method: "POST", body: JSON.stringify(data) }),
};
