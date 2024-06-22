import { computed, onMounted, ref } from "vue";

export default function useCripto() {
  const criptomonedas = ref([]);

  const monedas = ref([
    { codigo: "USD", texto: "Dolar de Estados Unidos" },
    { codigo: "MXN", texto: "Peso Mexicano" },
    { codigo: "EUR", texto: "Euro" },
    { codigo: "GBP", texto: "Libra Esterlina" },
  ]);

  const cotizacion = ref({});
  const cargando = ref(false);

  onMounted(() => {
    const URL =
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
    fetch(URL)
      .then((res) => res.json())
      .then(({ Data }) => (criptomonedas.value = Data));
  });

  const obtenerCotizacion = async (cotizar) => {
    cargando.value = true;
    cotizacion.value = {};
    const { moneda, criptomoneda } = cotizar;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const res = await fetch(url);
    const { DISPLAY } = await res.json();
    cotizacion.value = DISPLAY[criptomoneda][moneda];

    cargando.value = false;
  };

  const mostrarResultado = computed(() =>
    Object.values(cotizacion.value).includes("")
  );

  return {
    monedas,
    criptomonedas,
    cotizacion,
    cargando,
    obtenerCotizacion,
    mostrarResultado,
  };
}
