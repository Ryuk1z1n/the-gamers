import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    //Receber os dados do fomulário de registro
    const { email, password, name, lastName, birthDate } = await request.json();

    //validar se os campos estão preenchidos
    if (!email || !password || !name || !lastName || !birthDate) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    //validar a senha (minimo 6 caracteres)
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Senha deve ter pelo menos 6 caracteres" },
        { status: 400 }
      );
    }

    //verificar se e-mail já existe
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const existingUser = existingUsers[0];

    if (existingUser) {
      return NextResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 409 }
      );
    }
    //criptografar a senha (hashear)
    const hashedPassword = await bcrypt.hash(password, 10);

    //criar usuaria na db
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        name,
        lastName,
        birthDate: new Date(birthDate).toISOString().split("T")[0],
        password: hashedPassword,
      })
      .returning();

    //retornar sucesso (SEM  a senha!)
    return NextResponse.json(
      {
        message: "Usuário criado com sucesso",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no registro:", error);
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}
