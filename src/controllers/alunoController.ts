import { Request, Response } from "express";
import axios from "axios";

const apiUrl = "https://two025-1a-t13-es05-api2.onrender.com/api/v1";
const token = "g3-d72f4d0e90fce94208a9cc383c7e10ae7b";

export const getAlunoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const response = await axios.get(`${apiUrl}/students/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "Aluno não encontrado" });
    }
  } catch (error: any) {
    console.error("Erro ao buscar aluno:", error);
    res.status(500).json({ message: "Erro ao buscar aluno", error: error.message });
  }
};

export const getAlunoEnrollments = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const response = await axios.get(`${apiUrl}/students/${id}/enrollments`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Erro ao buscar matrículas do aluno:", error);
    res.status(500).json({ message: "Erro ao buscar matrículas do aluno", error: error.message });
  }

  export const getProfissionaisRelacionadosAoAluno = async (req: Request, res: Response) => {
    try {
      const id_aluno = parseInt(req.params.id);
      
      // Verifica se o aluno existe
      const aluno = await Aluno.findById(id_aluno);
      if (!aluno || !Array.isArray(aluno) || aluno.length === 0) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }
      
      // Busca os atendimentos do aluno
      const atendimentos = await Atendimento.findByAlunoId(id_aluno);
      
      if (!atendimentos || atendimentos.length === 0) {
        return res.json({ message: "Nenhum profissional relacionado encontrado", profissionais: [] });
      }
      
      // Extrai os IDs únicos dos funcionários dos atendimentos
      const funcionarioIds = [...new Set(atendimentos.map(atendimento => atendimento.id_funcionario))];
      
      // Array para armazenar os dados dos profissionais
      const profissionais = [];
      
      // Busca os dados de cada profissional
      for (const id_funcionario of funcionarioIds) {
        if (id_funcionario) { // Verifica se o ID não é nulo
          const funcionario = await Funcionario.findById(id_funcionario);
          if (funcionario && Array.isArray(funcionario) && funcionario.length > 0) {
            // Adiciona informações do último atendimento com este profissional
            const atendimentosComProfissional = atendimentos.filter(
              a => a.id_funcionario === id_funcionario
            ).sort((a, b) => new Date(b.data_atendimento).getTime() - new Date(a.data_atendimento).getTime());
            
            const profissionalInfo = {
              ...funcionario[0],
              ultimo_atendimento: atendimentosComProfissional[0] || null,
              total_atendimentos: atendimentosComProfissional.length
            };
            
            profissionais.push(profissionalInfo);
          }
        }
      }
      
      res.json({
        aluno: aluno[0],
        profissionais: profissionais
      });
    } catch (error) {
      console.error("Erro ao buscar profissionais relacionados ao aluno:", error);
      res.status(500).json({ message: "Erro ao buscar profissionais relacionados ao aluno" });
    }
  };  
};