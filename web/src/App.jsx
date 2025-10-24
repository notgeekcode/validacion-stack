import React from "react";
import { useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, API_URL } from "./api";

const qc = new QueryClient();

// --- Componentes UI muy simples (sin lib de UI) ---

function ComerciosPanel() {
  const queryClient = useQueryClient();

  // Listado
  const { data: comercios, isLoading, isError, error } = useQuery({
    queryKey: ["comercios"],
    queryFn: api.listarComercios
  });

  // Formulario crear
  const { register, handleSubmit, reset } = useForm({ defaultValues: { nombre: "", descripcion: "" }});
  const crear = useMutation({
    mutationFn: api.crearComercio,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["comercios"] });
    }
  });

  return (
    <section style={{ padding: 16, border: "1px solid #ddd", borderRadius: 12, marginBottom: 24 }}>
      <h2>🛍️ Comercios</h2>
      <p style={{ marginTop: 0, color: "#555" }}>API: {API_URL}</p>

      <form onSubmit={handleSubmit(crear.mutate)} style={{ display: "grid", gap: 8, maxWidth: 480 }}>
        <input placeholder="Nombre" {...register("nombre", { required: true, maxLength: 120 })} />
        <textarea placeholder="Descripción" {...register("descripcion")} />
        <button type="submit" disabled={crear.isPending}>
          {crear.isPending ? "Creando..." : "Crear comercio"}
        </button>
      </form>

      <div style={{ marginTop: 16 }}>
        <h3>Listado</h3>
        {isLoading && <div>Cargando...</div>}
        {isError && <div style={{ color: "red" }}>Error: {error.message}</div>}
        {!isLoading && Array.isArray(comercios) && comercios.length === 0 && <div>Sin comercios aún</div>}
        <ul>
          {Array.isArray(comercios) && comercios.map(c => (
            <li key={c.id}>
              <strong>#{c.id} {c.nombre}</strong>
              {c.descripcion ? ` — ${c.descripcion}` : ""} <small>({new Date(c.creado_en).toLocaleString()})</small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function EventosPanel() {
  const queryClient = useQueryClient();

  // Listado
  const { data: eventos, isLoading, isError, error } = useQuery({
    queryKey: ["eventos"],
    queryFn: api.listarEventos
  });

  // Formulario crear
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { titulo: "", comercio_id: "", fecha_inicio: "", fecha_fin: "" }
  });

  const crear = useMutation({
    mutationFn: (data) => {
      const payload = {
        titulo: data.titulo,
        comercio_id: data.comercio_id ? Number(data.comercio_id) : null,
        fecha_inicio: data.fecha_inicio ? new Date(data.fecha_inicio).toISOString() : null,
        fecha_fin: data.fecha_fin ? new Date(data.fecha_fin).toISOString() : null,
      };
      return api.crearEvento(payload);
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    }
  });

  return (
    <section style={{ padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
      <h2>📅 Eventos</h2>
      <form onSubmit={handleSubmit(crear.mutate)} style={{ display: "grid", gap: 8, maxWidth: 520 }}>
        <input placeholder="Título" {...register("titulo", { required: true, maxLength: 160 })} />
        <input type="number" placeholder="Comercio ID (opcional)" {...register("comercio_id")} />
        <label>Fecha inicio</label>
        <input type="datetime-local" {...register("fecha_inicio")} />
        <label>Fecha fin</label>
        <input type="datetime-local" {...register("fecha_fin")} />
        <button type="submit" disabled={crear.isPending}>
          {crear.isPending ? "Creando..." : "Crear evento"}
        </button>
      </form>

      <div style={{ marginTop: 16 }}>
        <h3>Listado</h3>
        {isLoading && <div>Cargando...</div>}
        {isError && <div style={{ color: "red" }}>Error: {error.message}</div>}
        {!isLoading && Array.isArray(eventos) && eventos.length === 0 && <div>Sin eventos aún</div>}
        <ul>
          {Array.isArray(eventos) && eventos.map(e => (
            <li key={e.id}>
              <strong>#{e.id} {e.titulo}</strong>
              {e.comercio_id ? ` — comercio #${e.comercio_id}` : ""}
              {" "}
              <small>
                {e.fecha_inicio ? new Date(e.fecha_inicio).toLocaleString() : "s/fecha"} → {e.fecha_fin ? new Date(e.fecha_fin).toLocaleString() : "s/fecha"}
              </small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <main style={{ fontFamily: "system-ui, Arial, sans-serif", margin: "24px auto", maxWidth: 960 }}>
        <h1>SITD Web (MVP)</h1>
        <ComerciosPanel />
        <EventosPanel />
      </main>
    </QueryClientProvider>
  );
}
