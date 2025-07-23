import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
import Post from './modules/Post';

const cadastro = new Login('.form-cadastro');
const newPost = new Post('.form-post')

cadastro.init();
newPost.init();


window.deletarPost = function(id) {

  const confirmar = confirm('Tem certeza que deseja apagar este post?');
  if (!confirmar) return;

  fetch(`/posts/delete/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.status === 204) {
      window.location.href = '/posts';
    } else {
      alert('Erro ao apagar o post');
    }
  });
};

(function listener () {
  document.addEventListener('DOMContentLoaded',() => { //esse evento espera os elementos html serem carregados
    const form = document.getElementById('form-post');

    if (form && window.location.pathname.startsWith('/posts/edit')) { //condicional pra ver se to na janela com o form aberto pra edição
      form.addEventListener('submit', async (e) => {
        console.log('Cheguei no submit');
        e.preventDefault(); //impeço o comportamento padrao de enviar o form. o form tem method post e quero forçar o put
        console.log('Consegui interceptar o submit', id);
        const id = window.location.pathname.split('/').pop(); //a rota aparecendo é posts/edit/_id. então isso garante que essa const seja a id do mongodb
        const assunto = form.assunto.value;
        const texto = form.texto.value;
        console.log(`Assunto: ${assunto}, id: ${id}`);

        try {
          console.log('Agora vou chamar a função update');
          await updatePost (id, {assunto,texto});
          console.log('Consegui chamar a função update');
          window.location.href = `/posts/`;
        } catch (err) {
          console.error('Erro:', err);
        }

      })
    }
  }
)
}
)();


async function updatePost(id, body) {
  try {
    console.log(`O id dentro da update é ${id}`);
    const response = await fetch(`/posts/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Deu ruim ao att. Status: ${response.status}`);
    }
    return response; // ou response.json() se quiser os dados
  } catch (error) {
    console.error('Erro no updatePost:', error);
    throw error; // para propagar o erro para quem chamou
  }
}
