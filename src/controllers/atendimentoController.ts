import { Request, Response } from "express";
import Atendimento from "../models/Atendimento";

export const getAtendimentos = async (req: Request, res: Response) => {
  try {
    const atendimentos = await Atendimento.findAll();
    res.json(atendimentos);
  } catch (error) {
    console.error("Erro ao buscar atendimentos:", error);
    res.status(500).json({ message: "Erro ao buscar atendimentos" });
  }
};

export const getAtendimentoById = async (req: Request, res: Response) => {
  try {
    const id_atendimento = parseInt(req.params.id);
    const atendimento = await Atendimento.findById(id_atendimento);
    if (atendimento && Array.isArray(atendimento) && atendimento.length > 0) {
      res.json(atendimento[0]);
    } else {
      res.status(404).json({ message: "Atendimento não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar Atendimento:", error);
    res.status(500).json({ message: "Erro ao buscar Atendimento" });
  }
};

export const getAtendimentosByFuncionario = async (req: Request, res: Response) => {
  try {
    const id_funcionario = parseInt(req.params.id_funcionario);
    const atendimentos = await Atendimento.findByFuncionarioId(id_funcionario);
    res.json(atendimentos);
  } catch (error) {
    console.error("Erro ao buscar atendimentos do funcionário:", error);
    res.status(500).json({ message: "Erro ao buscar atendimentos do funcionário" });
  }
};

export const getAtendimentosByAluno = async (req: Request, res: Response) => {
  try {
    const id_aluno = parseInt(req.params.id_aluno);
    const atendimentos = await Atendimento.findByAlunoId(id_aluno);
    res.json(atendimentos);
  } catch (error) {
    console.error("Erro ao buscar atendimentos do aluno:", error);
    res.status(500).json({ message: "Erro ao buscar atendimentos do aluno" });
  }
};

export const createAtendimento = async (req: Request, res: Response) => {
  try {
    const { 
      status_atendimento, 
      id_funcionario, 
      id_aluno 
    } = req.body;
    
    const result = await Atendimento.create(
      status_atendimento,
      id_funcionario,
      id_aluno
    );
    
    if (result && 'insertId' in result) {
      const novoAtendimento = await Atendimento.findById(result.insertId);
      res.status(201).json(novoAtendimento[0]);
    } else {
      res.status(400).json({ message: "Erro ao criar Atendimento" });
    }
  } catch (error) {
    console.error("Erro ao criar Atendimento:", error);
    res.status(500).json({ message: "Erro ao criar Atendimento" });
  }
};

export const updateAtendimento = async (req: Request, res: Response) => {
  try {
    const id_atendimento = parseInt(req.params.id);
    const { 
      status_atendimento, 
      id_funcionario, 
      id_aluno 
    } = req.body;
    
    const atendimento = await Atendimento.findById(id_atendimento);
    if (atendimento && Array.isArray(atendimento) && atendimento.length > 0) {
      await Atendimento.update(
        id_atendimento,
        status_atendimento,
        id_funcionario,
        id_aluno
      );
      const atendimentoAtualizado = await Atendimento.findById(id_atendimento);
      res.json(atendimentoAtualizado[0]);
    } else {
      res.status(404).json({ message: "Atendimento não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar Atendimento:", error);
    res.status(500).json({ message: "Erro ao atualizar Atendimento" });
  }
};

export const deleteAtendimento = async (req: Request, res: Response) => {
  try {
    const id_atendimento = parseInt(req.params.id);
    const atendimento = await Atendimento.findById(id_atendimento);
    
    if (atendimento && Array.isArray(atendimento) && atendimento.length > 0) {
      await Atendimento.delete(id_atendimento);
      res.json({ message: "Atendimento removido com sucesso" });
    } else {
      res.status(404).json({ message: "Atendimento não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao remover Atendimento:", error);
    res.status(500).json({ message: "Erro ao remover Atendimento" });
  }
};


// //criação de um novo método para atribuir um profissional a um atendimento
export const atribuirProfissional = async (req: Request, res: Response) => {
  try {
    // Obtém o ID do atendimento e o ID do funcionário
    const id_atendimento = parseInt(req.params.id);
    const { id_funcionario } = req.body;
    
    // Verifica se o ID do funcionário foi fornecido
    if (!id_funcionario) {
      return res.status(400).json({ message: "ID do funcionário é obrigatório" });
    }

    // Busca o atendimento pelo ID
    const atendimento = await Atendimento.findById(id_atendimento);
    
    // Se atendimento encontrado, atualiza com o ID do funcionário
    if (atendimento && Array.isArray(atendimento) && atendimento.length > 0) {
      await Atendimento.update(
        id_atendimento,
        atendimento[0].status_atendimento,
        id_funcionario,
        atendimento[0].id_aluno
      );
      
      // Retorna o atendimento atualizado
      const atendimentoAtualizado = await Atendimento.findById(id_atendimento);
      res.json({ message: "Profissional atribuído com sucesso", atendimento: atendimentoAtualizado[0] });
    } else {
      // Se atendimento não encontrado, retorna erro 404
      res.status(404).json({ message: "Atendimento não encontrado" });
    }
  } catch (error) {
    // Trata erros no processo
    console.error("Erro ao atribuir profissional ao atendimento:", error);
    res.status(500).json({ message: "Erro ao atribuir profissional ao atendimento" });
  }
};
