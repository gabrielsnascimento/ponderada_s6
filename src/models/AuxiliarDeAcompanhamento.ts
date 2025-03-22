import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import pool from "../config/database";

export default class AuxiliarDeAcompanhamento {
  static async create(
    nome: string,
    especializacoes?: string,
    email?: string,
    telefone?: number,
    empresa?: string
  ): Promise<ResultSetHeader> {
    const query = `INSERT INTO Auxiliar_de_Acompanhamento (nome, especializacoes, email, telefone, empresa) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      nome,
      especializacoes,
      email,
      telefone,
      empresa
    ]);
    return result;
  }

  static async findById(id_auxiliar: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Auxiliar_de_Acompanhamento WHERE id_auxiliar = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_auxiliar]);
    return rows;
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Auxiliar_de_Acompanhamento`;
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }

  static async update(
    id_auxiliar: number,
    nome?: string,
    especializacoes?: string,
    email?: string,
    telefone?: number,
    empresa?: string
  ): Promise<ResultSetHeader> {
    // Buscar dados atuais do auxiliar
    const [currentAuxiliar] = await this.findById(id_auxiliar);
    
    const query = `UPDATE Auxiliar_de_Acompanhamento SET 
                    nome = ?, 
                    especializacoes = ?, 
                    email = ?, 
                    telefone = ?, 
                    empresa = ? 
                  WHERE id_auxiliar = ?`;
    
    const [result] = await pool.execute<ResultSetHeader>(query, [
      nome ?? currentAuxiliar.nome,
      especializacoes ?? currentAuxiliar.especializacoes,
      email ?? currentAuxiliar.email,
      telefone ?? currentAuxiliar.telefone,
      empresa ?? currentAuxiliar.empresa,
      id_auxiliar
    ]);
    
    return result;
  }

  static async delete(id_auxiliar: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Auxiliar_de_Acompanhamento WHERE id_auxiliar = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id_auxiliar]);
    return result;
  }
}