/**
 * PROTOCOLO RESONANCIA — Ecosistema Táctico Neurobiológico
 * Especialista: Enrique Toledo
 * Arquitectura Zero-Backend | Persistencia LocalStorage | JSON Estático Integrado
 */

const STORAGE_KEYS = {
  FASE: 'protocolo_resonancia_fase', // Valor numérico de 1 a 4
  DANGER_SCORE: 'protocolo_resonancia_danger_score',
  STATE: 'protocolo_resonancia_state'
};

// Objeto/Array JSON Estático Hardcoded (Cofre de Mensagens + Cenários S.O.S + Dados Táticos das 4 Fases)
const PROTOCOLO_DB = {
  cofre_mensajes: [
    {
      id: "recuerdo_nostalgia_1",
      tipo: "Recuerdo Inducido",
      ancla: "comida",
      ancla_label: "Gastronómica / Comida",
      titulo: "La Pizza Incomible",
      fase_recomendada: [3, 4],
      texto: "¿Te acuerdas de aquella pizza rara que pedimos ese fin de semana y nadie pudo comérsela de lo mala que estaba? Me acordé hoy de la nada y me reí solo. ¿Cómo estás?",
      objetivo: "Arranca una sonrisa instantánea sin cargar peso romántico ni generar presión. Desarma su escudo defensivo."
    },
    {
      id: "loop_curiosidad_1",
      tipo: "Estímulo Sensorial",
      ancla: "nombre",
      ancla_label: "Tensión / Patrón Directo",
      titulo: "El Gatillo del Nombre (Máxima Tensión)",
      fase_recomendada: [2],
      texto: "¿[Nombre]?",
      objetivo: "Rompe todos los patrones. Al enviar solo su nombre por la mañana y desaparecer, su mente pasa horas intentando adivinar el motivo."
    },
    {
      id: "carta_prohibida_sos",
      tipo: "Artillería Pesada",
      ancla: "artilleria",
      ancla_label: "Desarme de Bloqueo Severo",
      titulo: "La Carta Prohibida",
      fase_recomendada: [1],
      condicion_especial: "Bloqueo total por más de 45 días",
      texto: "Hola [Nombre], ¿cómo estás? Sabes, he estado reflexionando bastante en estos últimos tiempos sobre nosotros... Entiendo perfectamente por qué tomaste distancia y hoy te escribo sin ninguna intención de presionarte ni de pedirte que cambiemos lo que pasó. Al contrario, quería agradecerte por lo bueno que compartimos y decirte que respeto tu tranquilidad al 100%. Te deseo de corazón lo mejor en esta etapa.",
      texto_original_resumen: "Hola [Nombre], ¿cómo estás? Sabes, he estado reflexionando bastante en estos últimos tiempos sobre nosotros... [texto completo]",
      objetivo: "Rompe de golpe cualquier expectativa de reclamo o súplica. Valida su decisión y desploma su resistencia."
    },
    {
      id: "loop_curiosidad_2",
      tipo: "Estímulo Sensorial",
      ancla: "lugar",
      ancla_label: "Espacial / Lugar o Viaje",
      titulo: "El Micro-Destello Espacial (Circuito Abierto)",
      fase_recomendada: [2],
      texto: "Hoy pasé por aquel lugar del que hablamos una vez y tenían razón en algo que dijiste. No te imaginas lo que vi...",
      objetivo: "Activa un vacío de información (Efecto Zeigarnik) validando su criterio sin revelar el desenlace. Obliga a su cerebro a preguntar qué pasó."
    },
    {
      id: "loop_curiosidad_3",
      tipo: "Estímulo Sensorial",
      ancla: "musica",
      ancla_label: "Auditiva / Música o Serie",
      titulo: "La Consulta de Experta (Cero Presión)",
      fase_recomendada: [2],
      texto: "Hola [Nombre], pregunta rápida de 10 segundos: ¿cómo se llamaba aquella canción/serie que me recomendaste hace meses? Me salió el tema hoy y me quedé con la duda.",
      objetivo: "Posiciona el contacto como algo funcional, breve y con límite de tiempo. Elimina el miedo a una conversación emocional pesada."
    },
    {
      id: "recuerdo_nostalgia_2",
      tipo: "Recuerdo Inducido",
      ancla: "lugar",
      ancla_label: "Espacial / Lugar o Viaje",
      titulo: "El Ancla del Viaje Caótico",
      fase_recomendada: [3, 4],
      texto: "Hola [Nombre], hoy vi una foto de un lugar idéntico a donde casi nos perdemos aquella vez y fue inevitable acordarme de tu cara en ese momento jajaja. Espero que todo vaya muy bien en tu semana.",
      objetivo: "Evoca una memoria episódica compartida de complicidad y aventura sin exigir respuesta inmediata."
    },
    {
      id: "recuerdo_nostalgia_3",
      tipo: "Recuerdo Inducido",
      ancla: "musica",
      ancla_label: "Auditiva / Música o Serie",
      titulo: "El Eco Auditivo Involuntario",
      fase_recomendada: [3, 4],
      texto: "Entré a un café hace un rato y estaba sonando exactamente ese tema que ponías siempre en el auto. Me pareció demasiada casualidad. ¿Cómo va todo por allá, [Nombre]?",
      objetivo: "Utiliza el córtex auditivo como puente directo a la memoria límbica positiva, generando calidez instantánea."
    },
    {
      id: "reconexion_fase4_1",
      tipo: "Puente Presencial",
      ancla: "comida",
      ancla_label: "Gastronómica / Café Casual",
      titulo: "La Invitación de Baja Fricción (Café de 20 Minutos)",
      fase_recomendada: [4],
      texto: "Oye [Nombre], el jueves voy a estar cerca de tu zona haciendo un trámite por la tarde. Paso por un café rápido a las 18:30, ¿te sumas 20 minutos y me cuentas qué tal va tu vida sin drama?",
      objetivo: "En Fase 4 de apertura, transforma la resonancia digital en presencia física con límite de tiempo para anular cualquier resistencia."
    }
  ],

  escenarios_sos: [
    {
      id: "sos_1",
      numero: "ESCENARIO 01",
      tag: "Frialdad / Monosílabos",
      titulo: "Me respondió con monosílabos ('Ok', 'Bien', 'Sí') o tardó horas",
      diagnostico: "Su amígdala está midiendo tu nivel de necesidad. Si envías un segundo mensaje reclamando atención o preguntando '¿te pasa algo?', confirmas su marco de superioridad y reactivas su rechazo.",
      instruccion: "Espera un mínimo de 3 a 4 horas. No hagas preguntas adicionales. Si necesitas cerrar la conversación con elegancia táctica, aplica este cierre neutro:",
      script: "Perfecto [Nombre], ¡qué bueno saberlo! Te dejo que sigo con unas cosas por aquí, que tengas excelente noche."
    },
    {
      id: "sos_2",
      numero: "ESCENARIO 02",
      tag: "Celos / Redes Sociales",
      titulo: "Subió una historia indirecta, de fiesta o con posible pretendiente",
      diagnostico: "Es un estímulo de tanteo (consciente o inconsciente) para verificar si sigues orbitando emocionalmente alrededor de ella. Cualquier reacción, reclamo o vista desesperada destruye tu posición.",
      instruccion: "Silencia sus historias por 72 horas inmediatamente. No publiques indirectas de vuelta. Si ella te escribe para medir tu reacción, responde mañana después de las 18:00h con total serenidad:",
      script: "Hola [Nombre], recién veo el teléfono, estuve desconectado el fin de semana enfocándome en unos proyectos. ¿Todo bien por allá?"
    },
    {
      id: "sos_3",
      numero: "ESCENARIO 03",
      tag: "Reclamo / Conflicto",
      titulo: "Sacó un reproche del pasado o intenta provocar una discusión",
      diagnostico: "Su mente racional busca justificarse provocándote una reacción impulsiva para decir: '¿Ves que no ha cambiado nada?'. Si te defiendes o peleas, pierdes.",
      instruccion: "Aplica Aikido Neuro-Verbal: valida su emoción sin aceptar culpa humillante y corta el bucle conflictivo en seco:",
      script: "Entiendo perfectamente por qué lo sentiste de esa manera en su momento, [Nombre]. Hoy prefiero quedarme con lo positivo que aprendimos y no entrar en discusiones que no nos hacen bien."
    },
    {
      id: "sos_4",
      numero: "ESCENARIO 04",
      tag: "Impulso de Madrugada",
      titulo: "Son más de las 23:00h y siento urgencia extrema de rogarle o stalkearla",
      diagnostico: "Estás bajo una caída aguda de dopamina combinada con fatiga del córtex prefrontal. Tu cerebro te miente diciéndote que escribirle aliviará el dolor, pero solo reiniciará su rechazo a cero.",
      instruccion: "Pon el celular en Modo Avión por 30 minutos y completa 3 ciclos del Respirador Táctico arriba. Si ella te escribió a medianoche, NUNCA respondas de madrugada; usa esto mañana a las 18:15h:",
      script: "Hola [Nombre], anoche me quedé dormido temprano y recién veo tu mensaje. Espero que tengas un gran día, hablamos luego."
    }
  ],

  fases_info: {
    1: {
      numero: 1,
      codigo: "FASE 01 — ALERTA CRÍTICA",
      nombre: "Saturación Cortisólica & Escudo Defensivo",
      subtitulo: "Instrucción Primaria: Silencio Táctico Absoluto (o Artillería Pesada si >45 días de bloqueo)",
      color_badge: "bg-red-50 text-red-700 border-red-200",
      barra_color: "from-red-600 to-rose-500",
      ventana_estado: "CERRADA — CONTENCIÓN OBLIGATORIA",
      neurobiologia: "Su amígdala cerebral asocia tu nombre con presión emocional y cortisol elevado. Cualquier intento de persuasión lógica, regalo o texto romántico será procesado como una amenaza a su libertad.",
      instruccion_tactica: "Detén todo contacto reactivo de inmediato. Debes aplicar Silencio Táctico para permitir que su nivel de cortisol descienda biológicamente. ÚNICA EXCEPCIÓN: Si llevas más de 45 días en bloqueo o distancia severa, el sistema desbloquea 'La Carta Prohibida' en el Cofre para quebrar su resistencia de raíz.",
      hacer: [
        "Aplicar Silencio Táctico estricto (Cero mensajes emocionales, cero likes, cero vistas a sus estados).",
        "Eliminar cualquier rastro de tristeza o indirectas en tus propias redes sociales.",
        "Utilizar exclusivamente 'La Carta Prohibida' si cumples la condición de bloqueo severo (>45 días)."
      ],
      evitar: [
        "Rogar, pedir 'una última charla para cerrar' o exigir explicaciones lógicas.",
        "Contactar a sus amigas o familiares para averiguar sobre ella.",
        "Enviar mensajes de madrugada bajo picos de ansiedad."
      ]
    },
    2: {
      numero: 2,
      codigo: "FASE 02 — PRECAUCIÓN TÁCTICA",
      nombre: "Resistencia Pasiva & Frialdad Monosilábica",
      subtitulo: "Instrucción Primaria: Ganchos de Curiosidad & Ruptura de Patrón",
      color_badge: "bg-amber-50 text-amber-800 border-amber-200",
      barra_color: "from-amber-500 to-orange-500",
      ventana_estado: "MICRO-APERTURA — SOLO ESTÍMULOS DE TENSIÓN",
      neurobiologia: "El rechazo agudo ha bajado, pero su escudo racional sigue activo. Ella espera que le escribas un texto largo o predecible para ignorarte o responder con monosílabos ('Ok', 'Bien').",
      instruccion_tactica: "Prohibido hablar de la relación o preguntar '¿cómo estás?' de forma genérica. Tu objetivo es secuestrar su atención mediante el Efecto Zeigarnik (circuitos abiertos de dopamina) usando 'El Gatillo del Nombre' o micro-consultas de 10 segundos.",
      hacer: [
        "Usar ganchos ultracortos de curiosidad (Ej: 'El Gatillo del Nombre') y retirar tu atención tras enviar.",
        "Mantener una proporción de texto menor o igual a la de ella.",
        "Dejar que su mente invierta horas intentando descifrar el motivo de tu mensaje."
      ],
      evitar: [
        "Responder en menos de 2 minutos cuando ella por fin contesta al gancho.",
        "Transformar un gancho de curiosidad exitoso en un interrogatorio amoroso.",
        "Enviar audios largos o textos de más de 3 líneas."
      ]
    },
    3: {
      numero: 3,
      codigo: "FASE 03 — DESHIELO NEUROBIOLÓGICO",
      nombre: "Neutralidad Receptiva & Memoria Episódica",
      subtitulo: "Instrucción Primaria: Activación de Recuerdo Inducido (Nostalgia Ligera)",
      color_badge: "bg-blue-50 text-brand-700 border-blue-200",
      barra_color: "from-brand-700 to-brand-500",
      ventana_estado: "ABIERTA — VENTANA DE RECUERDO INDUCIDO",
      neurobiologia: "Sus defensas corticales están bajas y su cerebro ya no te percibe como amenaza. Es el momento biológico exacto para infiltrar el sistema límbico usando anclas sensoriales compartidas (comida, música, lugares).",
      instruccion_tactica: "Despliega los scripts de 'Recuerdo Inducido' del Cofre de Mensajes (como 'La Pizza Incomible') preferiblemente después de las 18:00h. El objetivo es provocar una sonrisa involuntaria libre de presión romántica.",
      hacer: [
        "Seleccionar el Ancla Sensorial dominante (Comida, Lugar, Música) y enviar el script calibrado tras las 18:00h.",
        "Mantener un tono ligero, divertido y despreocupado.",
        "Cerrar tú primero la conversación en el punto más alto de calidez emocional."
      ],
      evitar: [
        "Mencionar el término, pedir volver o hablar de 'nosotros' en tono serio.",
        "Quedarte chateando durante 2 horas seguidas hasta agotar el tema.",
        "Mostrar celos o reclamar por el tiempo que estuvieron sin hablar."
      ]
    },
    4: {
      numero: 4,
      codigo: "FASE 04 — RESONANCIA ACTIVA",
      nombre: "Ventana de Oportunidad & Reconexión Límbica",
      subtitulo: "Instrucción Primaria: Recuerdo Inducido + Transición a Micro-Encuentro",
      color_badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
      barra_color: "from-emerald-600 to-teal-500",
      ventana_estado: "ÓPTIMA — MÁXIMA RECEPTIVIDAD HORMONAL",
      neurobiologia: "La oxitocina y la dopamina nostálgica superan al cortisol residual. Ella muestra receptividad, responde con rapidez o incluso busca excusas sutiles para interactuar contigo.",
      instruccion_tactica: "Combina un script de 'Recuerdo Inducido' para elevar el pico emocional y, tras 2 o 3 intercambios positivos, ejecuta el 'Puente Presencial' (invitación casual de baja fricción de 20 minutos).",
      hacer: [
        "Alternar entre Recuerdo Inducido ('La Pizza Incomible') y el script de Puente Presencial.",
        "Proponer un encuentro corto con límite de tiempo claro (ej. café de 20 minutos de paso).",
        "Conservar el misterio y la serenidad masculina durante todo el encuentro."
      ],
      evitar: [
        "Proponer una 'cena formal romántica' que reactive la presión de compromiso.",
        "Dar por ganada la reconquista y volver a conductas de necesidad o control.",
        "Exigir etiquetas ('¿entonces qué somos?') antes de consolidar la atracción presencial."
      ]
    }
  }
};

// Estado de la Aplicación
let appState = {
  faseActual: 3, // Por defecto 3 si no hay diagnóstico previo, pero se lee de LocalStorage
  tieneDiagnostico: false,
  dangerScore: 42,
  nombreEx: "",
  anclaSeleccionada: "todas",
  bloqueoSevero: false,
  cartaDesbloqueadaManual: false,
  checklistNocturno: [false, false, false, false],
  respuestasTermometro: {
    frialdad: null,
    tiempo: null,
    bloqueo: null,
    ancla: "comida"
  }
};

let breathInterval = null;

// Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  cargarEstadoLocalStorage();
  inicializarEventos();
  iniciarRelojNocturno();
  renderizarTodo();
});

function cargarEstadoLocalStorage() {
  try {
    const savedFase = localStorage.getItem(STORAGE_KEYS.FASE);
    const savedScore = localStorage.getItem(STORAGE_KEYS.DANGER_SCORE);
    const savedState = localStorage.getItem(STORAGE_KEYS.STATE);

    if (savedState) {
      const parsed = JSON.parse(savedState);
      appState = { ...appState, ...parsed };
    }

    if (savedFase !== null) {
      const numFase = parseInt(savedFase, 10);
      if (numFase >= 1 && numFase <= 4) {
        appState.faseActual = numFase;
        appState.tieneDiagnostico = true;
      }
    }

    if (savedScore !== null) {
      const numScore = parseInt(savedScore, 10);
      if (!isNaN(numScore)) {
        appState.dangerScore = numScore;
      }
    }
  } catch (err) {
    console.warn("LocalStorage lectura inicial:", err);
  }
}

function guardarEstadoLocalStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.FASE, String(appState.faseActual));
    localStorage.setItem(STORAGE_KEYS.DANGER_SCORE, String(appState.dangerScore));
    localStorage.setItem(STORAGE_KEYS.STATE, JSON.stringify(appState));
  } catch (err) {
    console.warn("LocalStorage escritura:", err);
  }
}

function inicializarEventos() {
  // Input nombre de la ex (sincronizado en Termómetro y Cofre)
  const inputsNombre = document.querySelectorAll(".input-nombre-ex");
  inputsNombre.forEach((input) => {
    input.value = appState.nombreEx || "";
    input.addEventListener("input", (e) => {
      appState.nombreEx = e.target.value.trim();
      inputsNombre.forEach((el) => {
        if (el !== e.target) el.value = e.target.value;
      });
      guardarEstadoLocalStorage();
      renderizarCofre();
      renderizarModalSOS();
    });
  });

  // Formulario del Termómetro
  const formTermometro = document.getElementById("form-termometro");
  if (formTermometro) {
    formTermometro.addEventListener("submit", procesarTermometro);
  }
}

function renderizarTodo() {
  renderizarHeaderDashboard();
  renderizarPanelFaseActual();
  renderizarCofre();
  renderizarChecklistNocturno();
  renderizarModalSOS();
  restaurarSeleccionesTermometro();
}

// ==========================================
// 1. DASHBOARD & HEADER STATUS
// ==========================================
function renderizarHeaderDashboard() {
  const faseInfo = PROTOCOLO_DB.fases_info[appState.faseActual];
  const badgeHeader = document.getElementById("header-fase-badge");
  const dashStatusFase = document.getElementById("dash-fase-actual");
  const dashStatusScore = document.getElementById("dash-danger-score");
  const dashStatusTexto = document.getElementById("dash-fase-descripcion");

  if (badgeHeader) {
    badgeHeader.textContent = appState.tieneDiagnostico
      ? `Fase ${appState.faseActual} Activa • Riesgo ${appState.dangerScore}%`
      : `Fase ${appState.faseActual} (Pre-Calibración)`;
  }

  if (dashStatusFase) {
    dashStatusFase.textContent = `FASE ${appState.faseActual}: ${faseInfo.nombre}`;
  }

  if (dashStatusScore) {
    dashStatusScore.textContent = `${appState.dangerScore}%`;
  }

  if (dashStatusTexto) {
    dashStatusTexto.textContent = faseInfo.subtitulo;
  }
}

// ==========================================
// 2. TERMÓMETRO DE LAS 4 FASES (DIAGNÓSTICO)
// ==========================================
function seleccionarOpcionTermometro(pregunta, valor, elementoBtn) {
  appState.respuestasTermometro[pregunta] = valor;

  // Actualizar estilos visuales del grupo
  const botonesGrupo = document.querySelectorAll(`[data-pregunta="${pregunta}"]`);
  botonesGrupo.forEach((btn) => {
    btn.classList.remove("border-brand-500", "bg-brand-50", "ring-2", "ring-brand-500/20");
    btn.classList.add("border-slate-200", "bg-white");
    const check = btn.querySelector(".indicador-radio");
    if (check) {
      check.classList.remove("bg-brand-500", "border-brand-500");
      check.classList.add("border-slate-300");
    }
  });

  if (elementoBtn) {
    elementoBtn.classList.remove("border-slate-200", "bg-white");
    elementoBtn.classList.add("border-brand-500", "bg-brand-50", "ring-2", "ring-brand-500/20");
    const check = elementoBtn.querySelector(".indicador-radio");
    if (check) {
      check.classList.remove("border-slate-300");
      check.classList.add("bg-brand-500", "border-brand-500");
    }
  }

  const alertaError = document.getElementById("termometro-error");
  if (alertaError) alertaError.classList.add("hidden");
}

function restaurarSeleccionesTermometro() {
  const { frialdad, tiempo, bloqueo, ancla } = appState.respuestasTermometro;
  if (frialdad !== null) {
    const btn = document.querySelector(`[data-pregunta="frialdad"][data-valor="${frialdad}"]`);
    if (btn) seleccionarOpcionTermometro("frialdad", frialdad, btn);
  }
  if (tiempo !== null) {
    const btn = document.querySelector(`[data-pregunta="tiempo"][data-valor="${tiempo}"]`);
    if (btn) seleccionarOpcionTermometro("tiempo", tiempo, btn);
  }
  if (bloqueo !== null) {
    const btn = document.querySelector(`[data-pregunta="bloqueo"][data-valor="${bloqueo}"]`);
    if (btn) seleccionarOpcionTermometro("bloqueo", bloqueo, btn);
  }
  const selectAncla = document.getElementById("termometro-ancla");
  if (selectAncla && ancla) {
    selectAncla.value = ancla;
  }
}

function procesarTermometro(e) {
  if (e) e.preventDefault();

  const { frialdad, tiempo, bloqueo } = appState.respuestasTermometro;
  const alertaError = document.getElementById("termometro-error");

  if (frialdad === null || tiempo === null || bloqueo === null) {
    if (alertaError) {
      alertaError.classList.remove("hidden");
      alertaError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  const selectAncla = document.getElementById("termometro-ancla");
  if (selectAncla) {
    appState.respuestasTermometro.ancla = selectAncla.value;
    appState.anclaSeleccionada = selectAncla.value;
  }

  // Cálculo matemático del Danger Score (0 a 100)
  const ptsFrialdad = parseInt(frialdad, 10); // 5 a 40
  const ptsTiempo = parseInt(tiempo, 10);     // 5 a 30
  const ptsBloqueo = parseInt(bloqueo, 10);   // 0 a 30

  const dangerScore = Math.min(100, Math.max(5, ptsFrialdad + ptsTiempo + ptsBloqueo));

  // Determinar Fase (1 a 4):
  // Fase 1: Peligro Crítico / Bloqueo Total (Score >= 75 o Bloqueo == 30) -> Silencio Táctico / Carta Prohibida
  // Fase 2: Resistencia / Frialdad (Score 50 a 74) -> Ganchos de Curiosidad
  // Fase 3: Neutralidad / Deshielo (Score 26 a 49) -> Recuerdo Inducido
  // Fase 4: Ventana de Oportunidad (Score <= 25) -> Recuerdo Inducido + Reconexión
  let nuevaFase = 3;
  if (ptsBloqueo >= 30 || dangerScore >= 75) {
    nuevaFase = 1;
  } else if (dangerScore >= 50) {
    nuevaFase = 2;
  } else if (dangerScore >= 26) {
    nuevaFase = 3;
  } else {
    nuevaFase = 4;
  }

  appState.dangerScore = dangerScore;
  appState.faseActual = nuevaFase;
  appState.tieneDiagnostico = true;
  appState.bloqueoSevero = ptsBloqueo >= 30 || nuevaFase === 1;

  guardarEstadoLocalStorage();

  // Mostrar pantalla de procesamiento neurobiológico simulado (2.2s)
  const formWrapper = document.getElementById("termometro-form-wrapper");
  const loaderWrapper = document.getElementById("termometro-loader");
  const barraLoader = document.getElementById("termometro-loader-bar");
  const textoLoader = document.getElementById("termometro-loader-text");

  if (formWrapper && loaderWrapper) {
    formWrapper.classList.add("hidden");
    loaderWrapper.classList.remove("hidden");

    const pasos = [
      { pct: "28%", txt: "Analizando nivel de cortisol y reactividad de la amígdala..." },
      { pct: "64%", txt: "Cruzando tiempo de silencio con umbral de bloqueo digital..." },
      { pct: "95%", txt: "Calculando Danger Score y liberando scripts del Cofre Secreto..." }
    ];

    if (barraLoader) barraLoader.style.width = "12%";

    pasos.forEach((paso, idx) => {
      setTimeout(() => {
        if (barraLoader) barraLoader.style.width = paso.pct;
        if (textoLoader) textoLoader.textContent = paso.txt;
      }, (idx + 1) * 650);
    });

    setTimeout(() => {
      loaderWrapper.classList.add("hidden");
      formWrapper.classList.remove("hidden");
      renderizarTodo();
      mostrarToast(`Diagnóstico completado: Fase ${nuevaFase} asignada y guardada.`);
      const seccionFase = document.getElementById("seccion-fase-actual");
      if (seccionFase) {
        seccionFase.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 2300);
  } else {
    renderizarTodo();
  }
}

// Permite cambiar/simular cualquier Fase manualmente y guardarla en LocalStorage
function cambiarFaseManual(numFase) {
  const fase = parseInt(numFase, 10);
  if (fase < 1 || fase > 4) return;

  const scoresPorDefecto = { 1: 88, 2: 62, 3: 36, 4: 15 };
  appState.faseActual = fase;
  appState.dangerScore = scoresPorDefecto[fase];
  appState.tieneDiagnostico = true;
  appState.bloqueoSevero = fase === 1;

  guardarEstadoLocalStorage();
  renderizarTodo();
  mostrarToast(`Panel calibrado en Fase ${fase} (Guardado en LocalStorage).`);
}

// ==========================================
// 3. PANEL DE LA FASE ACTUAL
// ==========================================
function renderizarPanelFaseActual() {
  const info = PROTOCOLO_DB.fases_info[appState.faseActual];
  if (!info) return;

  const elCodigo = document.getElementById("fase-codigo-badge");
  const elTitulo = document.getElementById("fase-titulo");
  const elSubtitulo = document.getElementById("fase-subtitulo");
  const elScoreValor = document.getElementById("fase-danger-score");
  const elScoreBarra = document.getElementById("fase-danger-bar");
  const elVentana = document.getElementById("fase-ventana-estado");
  const elNeuro = document.getElementById("fase-neurobiologia");
  const elInstruccion = document.getElementById("fase-instruccion-tactica");
  const elListaHacer = document.getElementById("fase-lista-hacer");
  const elListaEvitar = document.getElementById("fase-lista-evitar");

  if (elCodigo) {
    elCodigo.className = `inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border ${info.color_badge}`;
    elCodigo.innerHTML = `<span class="w-2 h-2 rounded-full bg-current animate-pulse"></span> ${info.codigo}`;
  }
  if (elTitulo) elTitulo.textContent = info.nombre;
  if (elSubtitulo) elSubtitulo.textContent = info.subtitulo;
  if (elScoreValor) elScoreValor.textContent = `${appState.dangerScore}%`;
  if (elScoreBarra) {
    elScoreBarra.style.width = `${appState.dangerScore}%`;
    elScoreBarra.className = `h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${info.barra_color}`;
  }
  if (elVentana) elVentana.textContent = info.ventana_estado;
  if (elNeuro) elNeuro.textContent = info.neurobiologia;
  if (elInstruccion) elInstruccion.textContent = info.instruccion_tactica;

  if (elListaHacer) {
    elListaHacer.innerHTML = info.hacer
      .map(
        (item) => `
        <li class="flex items-start gap-3 text-sm text-text-body leading-relaxed">
          <span class="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">✓</span>
          <span>${item}</span>
        </li>`
      )
      .join("");
  }

  if (elListaEvitar) {
    elListaEvitar.innerHTML = info.evitar
      .map(
        (item) => `
        <li class="flex items-start gap-3 text-sm text-text-body leading-relaxed">
          <span class="mt-0.5 w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0 font-bold text-xs">✕</span>
          <span>${item}</span>
        </li>`
      )
      .join("");
  }

  // Actualizar botones del selector rápido de fase
  document.querySelectorAll(".btn-selector-fase").forEach((btn) => {
    const f = parseInt(btn.getAttribute("data-fase"), 10);
    if (f === appState.faseActual) {
      btn.className =
        "btn-selector-fase px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 bg-brand-700 text-white shadow-soft";
    } else {
      btn.className =
        "btn-selector-fase px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 bg-brand-50 text-text-body hover:bg-brand-100";
    }
  });
}

// ==========================================
// 4. COFRE DE MENSAJES (BÓVEDA DINÁMICA)
// ==========================================
function filtrarAnclaCofre(ancla) {
  appState.anclaSeleccionada = ancla;
  guardarEstadoLocalStorage();
  renderizarCofre();
}

function toggleCartaProhibidaManual() {
  appState.cartaDesbloqueadaManual = !appState.cartaDesbloqueadaManual;
  guardarEstadoLocalStorage();
  renderizarCofre();
  if (appState.cartaDesbloqueadaManual) {
    mostrarToast("Alerta Táctica: 'La Carta Prohibida' ha sido desbloqueada manualmente.");
  }
}

function personalizarTexto(texto) {
  const reemplazo = appState.nombreEx && appState.nombreEx.length > 0 ? appState.nombreEx : "[Nombre]";
  return texto.replace(/\[Nombre\]/g, reemplazo);
}

function renderizarCofre() {
  const contenedorGrid = document.getElementById("cofre-mensajes-grid");
  const contenedorCarta = document.getElementById("cofre-carta-prohibida-box");
  const badgeFaseCofre = document.getElementById("cofre-fase-indicador");

  if (badgeFaseCofre) {
    badgeFaseCofre.textContent = `Mostrando scripts calibrados para FASE ${appState.faseActual}`;
  }

  // Actualizar estado visual de los botones de filtro de Ancla Sensorial
  document.querySelectorAll(".btn-ancla-filtro").forEach((btn) => {
    const anclaBtn = btn.getAttribute("data-ancla");
    if (anclaBtn === appState.anclaSeleccionada) {
      btn.className =
        "btn-ancla-filtro px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 bg-brand-700 text-white shadow-soft";
    } else {
      btn.className =
        "btn-ancla-filtro px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 bg-white text-text-body border border-slate-200 hover:border-brand-400";
    }
  });

  // Filtrar mensajes recomendados para la Fase actual (excluyendo la carta prohibida si se muestra en su pestaña especial, o incluyéndola en Fase 1)
  const scriptsFase = PROTOCOLO_DB.cofre_mensajes.filter((item) => {
    const coincideFase = item.fase_recomendada.includes(appState.faseActual);
    const coincideAncla =
      appState.anclaSeleccionada === "todas" || item.ancla === appState.anclaSeleccionada;
    return coincideFase && coincideAncla;
  });

  if (contenedorGrid) {
    if (scriptsFase.length === 0) {
      contenedorGrid.innerHTML = `
        <div class="col-span-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft text-center">
          <p class="text-text-heading font-heading font-bold text-lg mb-2">No hay scripts con esa ancla específica para la Fase ${appState.faseActual}</p>
          <p class="text-text-body text-sm mb-5">En la Fase ${appState.faseActual}, el protocolo prioriza estímulos específicos compatibles con su umbral neurobiológico.</p>
          <button onclick="filtrarAnclaCofre('todas')" class="px-5 py-2.5 rounded-xl bg-brand-700 text-white text-xs font-semibold hover:bg-brand-500 transition-all duration-300">
            Ver todos los scripts de Fase ${appState.faseActual}
          </button>
        </div>
      `;
    } else {
      contenedorGrid.innerHTML = scriptsFase
        .map((script) => {
          const textoFinal = personalizarTexto(script.texto);
          const esCarta = script.id === "carta_prohibida_sos";
          return `
          <article class="bg-white rounded-3xl p-8 shadow-float border ${
            esCarta ? "border-red-300 ring-2 ring-red-500/10" : "border-slate-100"
          } flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span class="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  esCarta
                    ? "bg-red-100 text-red-800"
                    : "bg-brand-50 text-brand-700 border border-brand-100"
                }">
                  ${script.tipo}
                </span>
                <span class="text-xs font-semibold text-text-muted">
                  Fase Recomendada: ${script.fase_recomendada.join(" y ")}
                </span>
              </div>

              <h3 class="font-heading font-extrabold text-xl text-text-heading mb-2">
                ${script.titulo}
              </h3>

              ${
                script.condicion_especial
                  ? `<div class="mb-4 px-3.5 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <span>⚠️ Condición Especial: ${script.condicion_especial}</span>
                    </div>`
                  : `<p class="text-xs font-medium text-brand-500 mb-4">Ancla Sensorial: ${script.ancla_label || "Calibración Táctica"}</p>`
              }

              <div class="bg-brand-50/90 border border-brand-100 rounded-2xl p-5 mb-5 relative">
                <span class="block text-[11px] font-bold uppercase tracking-wider text-brand-700 mb-2">Script Exacto (Palabra por Palabra):</span>
                <p class="text-text-heading font-medium text-base leading-relaxed select-all">"${textoFinal}"</p>
              </div>

              <div class="mb-6">
                <span class="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Objetivo Neurobiológico:</span>
                <p class="text-sm text-text-body leading-relaxed">${script.objetivo}</p>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onclick="copiarScript('${encodeURIComponent(textoFinal)}', '${script.titulo}')"
                class="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 hover:from-brand-900 hover:to-brand-700 text-white font-heading font-bold text-sm shadow-soft transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                Copiar Script Calibrado
              </button>
            </div>
          </article>`;
        })
        .join("");
    }
  }

  // Renderizar Pestaña / Alerta Especial de "La Carta Prohibida"
  if (contenedorCarta) {
    const cartaObj = PROTOCOLO_DB.cofre_mensajes.find((m) => m.id === "carta_prohibida_sos");
    const liberadaPorFase1 = appState.faseActual === 1;
    const mostrarDesbloqueada = liberadaPorFase1 || appState.cartaDesbloqueadaManual;

    if (mostrarDesbloqueada && cartaObj) {
      const textoCarta = personalizarTexto(cartaObj.texto);
      contenedorCarta.innerHTML = `
        <div class="bg-white rounded-3xl p-8 border-2 border-red-200 shadow-float transition-all duration-300">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-extrabold uppercase tracking-wider mb-2">
                <span>🔓 ARTILLERÍA PESADA DESBLOQUEADA</span>
              </div>
              <h3 class="font-heading font-extrabold text-2xl text-text-heading">${cartaObj.titulo}</h3>
              <p class="text-sm text-red-700 font-medium mt-1">
                Condición de uso: ${cartaObj.condicion_especial} • Usar con extrema precaución.
              </p>
            </div>
            ${
              !liberadaPorFase1
                ? `<button onclick="toggleCartaProhibidaManual()" class="self-start md:self-center px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-text-body hover:bg-slate-50 transition-all">
                    Ocultar Bóveda de Fase 1
                  </button>`
                : `<span class="px-4 py-2 rounded-xl bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                    Activa por Diagnóstico Fase 1
                  </span>`
            }
          </div>

          <div class="grid md:grid-cols-3 gap-6 mt-6">
            <div class="md:col-span-2 bg-brand-50 rounded-2xl p-6 border border-brand-100">
              <span class="text-xs font-bold uppercase tracking-wider text-brand-700 block mb-2">
                Texto Completo de La Carta Prohibida:
              </span>
              <p class="text-text-heading font-medium text-base leading-relaxed select-all mb-3">
                "${textoCarta}"
              </p>
              <p class="text-xs text-text-muted italic">
                Referencia de estructura base: "${personalizarTexto(cartaObj.texto_original_resumen)}"
              </p>
            </div>

            <div class="flex flex-col justify-between bg-slate-50 rounded-2xl p-6 border border-slate-200/70">
              <div>
                <h4 class="font-heading font-bold text-sm text-text-heading uppercase tracking-wider mb-2">
                  Efecto Neurobiológico:
                </h4>
                <p class="text-sm text-text-body leading-relaxed mb-4">
                  ${cartaObj.objetivo}
                </p>
                <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                  <strong>Regla de Oro:</strong> Una vez enviada La Carta Prohibida, debes mantener silencio absoluto durante al menos 14 días sin importar si responde de inmediato o tarda días.
                </div>
              </div>

              <button
                onclick="copiarScript('${encodeURIComponent(textoCarta)}', 'La Carta Prohibida')"
                class="mt-5 w-full py-3.5 px-4 rounded-xl bg-brand-700 hover:bg-brand-900 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-soft"
              >
                Copiar La Carta Prohibida
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      contenedorCarta.innerHTML = `
        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 border border-brand-100">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-slate-100 text-text-body text-xs font-bold uppercase tracking-wider mb-1">
                🔒 Archivo Clasificado — Fase 1 Severa
              </div>
              <h3 class="font-heading font-extrabold text-lg text-text-heading">
                "La Carta Prohibida" (Bloqueada en Fase ${appState.faseActual})
              </h3>
              <p class="text-sm text-text-body mt-1 max-w-2xl">
                Este recurso de Artillería Pesada solo se recomienda cuando el Termómetro detecta <strong>Fase 1 Severa (Bloqueo total por más de 45 días)</strong>. Usarla en Fase ${appState.faseActual} es innecesario porque ya tienes apertura para estímulos más sutiles.
              </p>
            </div>
          </div>
          <button
            onclick="toggleCartaProhibidaManual()"
            class="shrink-0 px-5 py-3 rounded-xl border border-brand-700/30 text-brand-700 hover:bg-brand-50 font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300"
          >
            Inspeccionar Bajo Mi Riesgo
          </button>
        </div>
      `;
    }
  }
}

// ==========================================
// 5. PROTOCOLO DE PRESENCIA NOCTURNA (18:00H+)
// ==========================================
function iniciarRelojNocturno() {
  actualizarRelojNocturno();
  setInterval(actualizarRelojNocturno, 15000);
}

function actualizarRelojNocturno() {
  const ahora = new Date();
  const horas = ahora.getHours();
  const minutos = String(ahora.getMinutes()).padStart(2, "0");
  const horaFormateada = `${String(horas).padStart(2, "0")}:${minutos}h`;

  const elHora = document.getElementById("reloj-nocturno-hora");
  const elEstado = document.getElementById("reloj-nocturno-estado");
  const elDetalle = document.getElementById("reloj-nocturno-detalle");

  if (elHora) elHora.textContent = horaFormateada;

  // Ventana óptima: 18:00h a 22:59h
  const enVentanaOptima = horas >= 18 && horas <= 22;
  const esMadrugadaPeligrosa = horas >= 23 || horas < 6;

  if (elEstado && elDetalle) {
    if (enVentanaOptima) {
      elEstado.className =
        "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200";
      elEstado.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span> VENTANA HORMONAL ABIERTA (POST 18:00H)`;
      elDetalle.textContent =
        "Estás dentro del horario táctico ideal (18:00h – 22:30h). Su fatiga decisoria reduce la barrera defensiva y multiplica el impacto del Recuerdo Inducido.";
    } else if (esMadrugadaPeligrosa) {
      elEstado.className =
        "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200";
      elEstado.innerHTML = `<span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> ALERTA DE MADRUGADA — NO ENVIAR AHORA`;
      elDetalle.textContent =
        "Enviar mensajes de madrugada transmite insomnio y necesidad emocional. Deja tu script preparado hoy y dispáralo mañana a partir de las 18:00h.";
    } else {
      const faltanHoras = 18 - horas;
      elEstado.className =
        "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200";
      elEstado.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-600"></span> MODO PREPARACIÓN (FALTAN ~${faltanHoras}H PARA LAS 18:00H)`;
      elDetalle.textContent =
        "Durante el día su mente está ocupada en modo productivo/racional. Calibra hoy tu script en el Cofre y ejecútalo después de las 18:00h (salvo 'El Gatillo del Nombre' en Fase 2).";
    }
  }
}

function toggleCheckNocturno(index) {
  appState.checklistNocturno[index] = !appState.checklistNocturno[index];
  guardarEstadoLocalStorage();
  renderizarChecklistNocturno();
}

function renderizarChecklistNocturno() {
  const checks = appState.checklistNocturno || [false, false, false, false];
  const totalMarcados = checks.filter(Boolean).length;

  checks.forEach((activo, idx) => {
    const btn = document.getElementById(`check-nocturno-${idx}`);
    const box = document.getElementById(`check-box-${idx}`);
    if (btn && box) {
      if (activo) {
        btn.classList.add("border-brand-500", "bg-brand-50/70");
        btn.classList.remove("border-slate-200", "bg-white");
        box.className =
          "w-6 h-6 rounded-lg bg-brand-700 text-white flex items-center justify-center font-bold text-xs shrink-0 transition-all";
        box.innerHTML = "✓";
      } else {
        btn.classList.remove("border-brand-500", "bg-brand-50/70");
        btn.classList.add("border-slate-200", "bg-white");
        box.className =
          "w-6 h-6 rounded-lg border-2 border-slate-300 text-transparent flex items-center justify-center font-bold text-xs shrink-0 transition-all";
        box.innerHTML = "✓";
      }
    }
  });

  const badgeStatus = document.getElementById("checklist-status-badge");
  if (badgeStatus) {
    if (totalMarcados === 4) {
      badgeStatus.className =
        "px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-heading font-bold text-xs border border-emerald-200";
      badgeStatus.textContent = "✓ VALIDACIÓN COMPLETA (4/4): LISTO PARA EJECUTAR ENVÍO";
    } else {
      badgeStatus.className =
        "px-4 py-2 rounded-xl bg-brand-50 text-brand-700 font-heading font-bold text-xs border border-brand-100";
      badgeStatus.textContent = `VERIFICACIÓN PRE-ENVÍO: ${totalMarcados}/4 COMPLETADOS`;
    }
  }
}

// ==========================================
// 6. BOTÓN DE EMERGENCIA S.O.S. (MODAL GLOBAL)
// ==========================================
function abrirModalSOS() {
  const modal = document.getElementById("modal-sos");
  if (modal) {
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.remove("opacity-0");
      modal.classList.add("opacity-100");
    }, 10);
    document.body.style.overflow = "hidden";
    iniciarRespiracionSOS();
  }
}

function cerrarModalSOS() {
  const modal = document.getElementById("modal-sos");
  if (modal) {
    modal.classList.remove("opacity-100");
    modal.classList.add("opacity-0");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
    document.body.style.overflow = "";
    detenerRespiracionSOS();
  }
}

function iniciarRespiracionSOS() {
  detenerRespiracionSOS();
  const elTexto = document.getElementById("sos-breath-text");
  const elCirculo = document.getElementById("sos-breath-circle");
  if (!elTexto || !elCirculo) return;

  const fases = [
    { texto: "INHALA PROFUNDO POR LA NARIZ (4s)...", escala: "scale-110 bg-brand-500 text-white" },
    { texto: "MANTÉN EL AIRE Y BAJA TUS HOMBROS (7s)...", escala: "scale-105 bg-brand-700 text-white" },
    { texto: "EXHALA LENTO POR LA BOCA SOLTANDO LA URGENCIA (8s)...", escala: "scale-95 bg-brand-900 text-white" }
  ];

  let idx = 0;
  const aplicarFase = () => {
    const f = fases[idx % fases.length];
    elTexto.textContent = f.texto;
    elCirculo.className = `w-14 h-14 rounded-2xl flex items-center justify-center font-heading font-extrabold text-sm shadow-soft transition-all duration-700 shrink-0 ${f.escala}`;
    idx++;
  };

  aplicarFase();
  breathInterval = setInterval(aplicarFase, 4000);
}

function detenerRespiracionSOS() {
  if (breathInterval) {
    clearInterval(breathInterval);
    breathInterval = null;
  }
}

function renderizarModalSOS() {
  const contenedor = document.getElementById("sos-escenarios-grid");
  if (!contenedor) return;

  contenedor.innerHTML = PROTOCOLO_DB.escenarios_sos
    .map((esc) => {
      const scriptPersonalizado = personalizarTexto(esc.script);
      return `
      <div class="bg-white rounded-3xl p-6 md:p-7 border border-slate-200 shadow-soft flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-[11px] font-extrabold uppercase tracking-wider">
              ${esc.numero} • ${esc.tag}
            </span>
          </div>

          <h4 class="font-heading font-extrabold text-lg text-text-heading mb-3">
            "${esc.titulo}"
          </h4>

          <p class="text-xs text-text-body leading-relaxed mb-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
            <strong class="text-text-heading">Diagnóstico de Enrique Toledo:</strong> ${esc.diagnostico}
          </p>

          <p class="text-xs font-semibold text-brand-700 mb-3">
            👉 ${esc.instruccion}
          </p>

          <div class="bg-brand-50 border border-brand-100 rounded-2xl p-4 mb-4">
            <span class="block text-[10px] font-bold uppercase tracking-wider text-brand-700 mb-1">
              Respuesta Rápida Anti-Impulso:
            </span>
            <p class="text-sm font-medium text-text-heading select-all">"${scriptPersonalizado}"</p>
          </div>
        </div>

        <button
          onclick="copiarScript('${encodeURIComponent(scriptPersonalizado)}', '${esc.numero}')"
          class="w-full py-3 px-4 rounded-xl bg-brand-700 hover:bg-brand-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          Copiar Respuesta Táctica
        </button>
      </div>`;
    })
    .join("");
}

// ==========================================
// UTILIDADES: COPIAR & NOTIFICACIÓN TOAST
// ==========================================
function copiarScript(textoCodificado, titulo) {
  const texto = decodeURIComponent(textoCodificado);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(() => {
      mostrarToast(`Script "${titulo}" copiado al portapapeles.`);
    });
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = texto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    mostrarToast(`Script "${titulo}" copiado al portapapeles.`);
  }
}

function mostrarToast(mensaje) {
  const toast = document.getElementById("toast-notificacion");
  const toastTexto = document.getElementById("toast-texto");
  if (!toast || !toastTexto) return;

  toastTexto.textContent = mensaje;
  toast.classList.remove("translate-y-20", "opacity-0", "pointer-events-none");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-20", "opacity-0", "pointer-events-none");
  }, 3400);
}

