import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import pool from "../config/database";

export default class Aluno {
  static async create(
    nome: string,
    data_nascimento?: Date,
    unidade?: string,
    curso?: string,
    turno?: string,
    tipo_necessidade?: string,
    necessita_tecnologia_assistiva?: string,
    necessita_acompanhamento?: boolean,
    ano_matricula?: Date,
    data_da_matricula?: Date,
    data_fim_do_curso?: Date,
    tipo_do_curso?: string,
    nome_do_responsavel?: string,
    email_do_responsavel?: string,
    telefone_do_responsavel?: number,
    atendimento_unidade_anterior?: string,
    casos_na_familia?: string,
    observacao_casos_familia?: string
  ): Promise<ResultSetHeader> {
    const query = `INSERT INTO Aluno (nome, data_nascimento, unidade, curso, turno, tipo_necessidade, 
                    necessita_tecnologia_assistiva, necessita_acompanhamento, ano_matricula, data_da_matricula, 
                    data_fim_do_curso, tipo_do_curso, nome_do_responsavel, email_do_responsavel, 
                    telefone_do_responsavel, atendimento_unidade_anterior, casos_na_familia, observacao_casos_familia) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const [result] = await pool.execute<ResultSetHeader>(query, [
      nome,
      data_nascimento,
      unidade,
      curso,
      turno,
      tipo_necessidade,
      necessita_tecnologia_assistiva,
      necessita_acompanhamento,
      ano_matricula,
      data_da_matricula,
      data_fim_do_curso,
      tipo_do_curso,
      nome_do_responsavel,
      email_do_responsavel,
      telefone_do_responsavel,
      atendimento_unidade_anterior,
      casos_na_familia,
      observacao_casos_familia
    ]);
    
    return result;
  }

  static async findById(id_aluno: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Aluno WHERE id_aluno = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_aluno]);
    return rows;
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Aluno`;
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }

  static async update(
    id_aluno: number,
    nome?: string,
    data_nascimento?: Date,
    unidade?: string,
    curso?: string,
    turno?: string,
    tipo_necessidade?: string,
    necessita_tecnologia_assistiva?: string,
    necessita_acompanhamento?: boolean,
    ano_matricula?: Date,
    data_da_matricula?: Date,
    data_fim_do_curso?: Date,
    tipo_do_curso?: string,
    nome_do_responsavel?: string,
    email_do_responsavel?: string,
    telefone_do_responsavel?: number,
    atendimento_unidade_anterior?: string,
    casos_na_familia?: string,
    observacao_casos_familia?: string
  ): Promise<ResultSetHeader> {
    // Primeiro, buscamos o aluno atual para manter os valores existentes
    const [currentAluno] = await this.findById(id_aluno);
    
    const query = `UPDATE Aluno SET 
                    nome = ?, 
                    data_nascimento = ?, 
                    unidade = ?, 
                    curso = ?, 
                    turno = ?, 
                    tipo_necessidade = ?, 
                    necessita_tecnologia_assistiva = ?, 
                    necessita_acompanhamento = ?, 
                    ano_matricula = ?, 
                    data_da_matricula = ?, 
                    data_fim_do_curso = ?, 
                    tipo_do_curso = ?, 
                    nome_do_responsavel = ?, 
                    email_do_responsavel = ?, 
                    telefone_do_responsavel = ?, 
                    atendimento_unidade_anterior = ?, 
                    casos_na_familia = ?, 
                    observacao_casos_familia = ? 
                  WHERE id_aluno = ?`;
    
    const [result] = await pool.execute<ResultSetHeader>(query, [
      nome ?? currentAluno.nome,
      data_nascimento ?? currentAluno.data_nascimento,
      unidade ?? currentAluno.unidade,
      curso ?? currentAluno.curso,
      turno ?? currentAluno.turno,
      tipo_necessidade ?? currentAluno.tipo_necessidade,
      necessita_tecnologia_assistiva ?? currentAluno.necessita_tecnologia_assistiva,
      necessita_acompanhamento ?? currentAluno.necessita_acompanhamento,
      ano_matricula ?? currentAluno.ano_matricula,
      data_da_matricula ?? currentAluno.data_da_matricula,
      data_fim_do_curso ?? currentAluno.data_fim_do_curso,
      tipo_do_curso ?? currentAluno.tipo_do_curso,
      nome_do_responsavel ?? currentAluno.nome_do_responsavel,
      email_do_responsavel ?? currentAluno.email_do_responsavel,
      telefone_do_responsavel ?? currentAluno.telefone_do_responsavel,
      atendimento_unidade_anterior ?? currentAluno.atendimento_unidade_anterior,
      casos_na_familia ?? currentAluno.casos_na_familia,
      observacao_casos_familia ?? currentAluno.observacao_casos_familia,
      id_aluno
    ]);
    
    return result;
  }

  static async delete(id_aluno: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Aluno WHERE id_aluno = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id_aluno]);
    return result;
  }

  // Método para buscar alunos por tipo de necessidade
  static async findByNecessidade(tipo_necessidade: string): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Aluno WHERE tipo_necessidade LIKE ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [`%${tipo_necessidade}%`]);
    return rows;
  }
}