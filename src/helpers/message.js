import Swal from "sweetalert2";

export const showMessage = (title, text, icon, function_confirmation) => {
  Swal.fire({
    title: title,
    text: icon == "error" ? String(text)?.replace("Error: ", "") : text,
    icon: icon,
    footer: "©" + new Date().getFullYear() + " MedScan",
  }).then(() => {
    if (function_confirmation !== null) {
      function_confirmation();
    }
  });
};

export const showQuestion = (title, text, icon, function_confirmation) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.value) {
      if (function_confirmation !== null) function_confirmation(true);
    } else {
      function_confirmation(false);
    }
  });
};
