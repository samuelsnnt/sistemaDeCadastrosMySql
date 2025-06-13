const express = require('express');
const app = express();
const path = require('path');
const Post = require('./models/Post.js')
const bodyParser = require('body-parser');//BODY-PARSER - Recebe dados de um formulário no Express.
const bcrypt = require('bcrypt');

const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions: { allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true,},}))
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', function(req, res){ // INDICA SITE (USO DA /(BARRA))
    res.render('home'); // INDICA ARQUIVO
});
app.get('/registrar', function(req, res){ // INDICA SITE (USO DA /(BARRA))
    res.render('registrar'); // INDICA ARQUIVO
});
app.post('/registrado', async function(req, res){
    try {
        const hashSenha = await bcrypt.hash(req.body.senha, 10); // 10 = número de "rounds" de hash (bom padrão)
        
        await Post.create({
            usuario: req.body.usuario,
            email: req.body.email,
            senha: hashSenha,
            senhaOriginal: req.body.senha // ❌ apenas para testes
        });
        
        res.redirect('/login');
    } catch (erro) {
        res.send('Houve um erro: ' + erro);
    }
});

app.get('/login', (req, res) => {
  const erro = req.query.erro;
  let mensagem = '';
  if (erro === 'usuario') mensagem = 'Usuário não encontrado';
  if (erro === 'senha') mensagem = 'Senha incorreta';
  res.render('login', { mensagem });
});

app.post('/login', async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    const user = await Post.findOne({ where: { usuario } });
    if (!user) {
      // Redireciona para /login com erro usuário
      return res.redirect('/login?erro=usuario');
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      // Redireciona para /login com erro senha
      return res.redirect('/login?erro=senha');
    }

    // Login válido
    return res.redirect('/usuarios');
  } catch (erro) {
    console.error(erro);
    return res.status(500).send('Erro no servidor');
  }
});\


app.get('/usuarios', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
      res.render('usuarios', {posts: posts});
  });
});

app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send('Postagem deletada com sucesso!')
    }).catch(function(erro){
        res.send('Esta postagem não existe!')
    })
});

//EXIBIR, APAGAR E ALTERAR DADOS DO BANCO DE DADOS

// Pasta de arquivos estáticos (CSS, JS, imagens etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(5432, function(){
    console.log('Servidor rodando na URL: http://localhost:8081')
});