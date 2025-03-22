import { Router, RequestHandler } from 'express';
import { 
  getAtendimentos, 
  getAtendimentoById, 
  getAtendimentosByFuncionario, 
  getAtendimentosByAluno, 
  createAtendimento, 
  updateAtendimento, 
  deleteAtendimento,
  atribuirProfissional
} from '../controllers/atendimentoController';

const router = Router();

// Rotas específicas PRIMEIRO - rotas com padrões fixos
router.get('/teste', (req, res) => {
  res.json({ message: 'Rota de teste funcionando!' });
});

// Rotas com parâmetros específicos
router.get('/funcionario/:id_funcionario', getAtendimentosByFuncionario);
router.get('/aluno/:id_aluno', getAtendimentosByAluno);
router.put("/:id/atribuir-profissional", atribuirProfissional as unknown as RequestHandler);

// Rota para listar todos
router.get('/', getAtendimentos);

// Rotas genéricas com parâmetro ID - estas devem vir POR ÚLTIMO
router.get('/:id', getAtendimentoById);
router.put('/:id', updateAtendimento);
router.delete('/:id', deleteAtendimento);

// Rotas para criar
router.post('/', createAtendimento);

export default router;