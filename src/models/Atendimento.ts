import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import pool from "../config/database";

export default class Atendimento {
  static async create(
    status_atendimento: number,
    id_funcionario: number,
    id_aluno: number
  ): Promise<ResultSetHeader> {
    const query = `INSERT INTO Atendimento (status_atendimento, id_funcionario, id_aluno) VALUES (?, ?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      status_atendimento,
      id_funcionario,
      id_aluno
    ]);
    return result;
  }

  static async findById(id_atendimento: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Atendimento WHERE id_atendimento = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_atendimento]);
    return rows;
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Atendimento`;
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }

  static async findByFuncionarioId(id_funcionario: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Atendimento WHERE id_funcionario = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_funcionario]);
    return rows;
  }

  static async findByAlunoId(id_aluno: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Atendimento WHERE id_aluno = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_aluno]);
    return rows;
  }

  static async update(
    id_atendimento: number,
    status_atendimento: number,
    id_funcionario?: number,
    id_aluno?: number
  ): Promise<ResultSetHeader> {
    let query = `UPDATE Atendimento SET status_atendimento = ?`;
    let params: any[] = [status_atendimento];
    
    if (id_funcionario) {
      query += `, id_funcionario = ?`;
      params.push(id_funcionario);
    }
    
    if (id_aluno) {
      query += `, id_aluno = ?`;
      params.push(id_aluno);
    }
    
    query += ` WHERE id_atendimento = ?`;
    params.push(id_atendimento);
    
    const [result] = await pool.execute<ResultSetHeader>(query, params);
    return result;
  }

  static async delete(id_atendimento: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Atendimento WHERE id_atendimento = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id_atendimento]);
    return result;
  }
}