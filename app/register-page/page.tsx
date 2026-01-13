"use client";

import { Calendar28 } from "@/components/Date/Date";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/dist/client/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

//hooks do react
export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //estado que armazena todos os dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  // estado para erros especificos de cada campo
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  //função que atualiza o estado quando qualquer campo muda
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target; //pega o ID e valor
    setFormData((prev) => ({
      ...prev, //mantém os outros campos
      [id]: value, //atualiza apenas o cmapo que mudou
    }));
    if (fieldErrors[id]) {
      setFieldErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleDateChange = (date: string) => {
    setFormData((prev) => ({
      ...prev,
      birthDate: date,
    }));
    if (fieldErrors.birthDate) {
      setFieldErrors((prev) => ({ ...prev, birthDate: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    //validações básicas
    if (!formData.name.trim()) errors.name = "Nome é obrigatório";
    if (!formData.lastName.trim()) errors.lastName = "Sobrenome é obrigatório";

    if (!formData.email.trim()) {
      errors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "E-mail inválido";
    }

    if (!formData.birthDate) {
      errors.birthDate = "Data de nascimento é obrigatória";
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (birthDate > today) {
        errors.birthDate = "Data de nascimento não pode ser futura";
      }
    }

    if (!formData.password) {
      errors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      errors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirme sua senha";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //função executada quando o formulário é enviado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // previne o comportamento padrão do formulário (recarregar a página)
    setError(null); // limpa erros anteriores

    console.log("fomulário enviado");
    console.log("dados do formulario", formData);

    if (!validateForm()) {
      console.log("validação falhou");
      return;
    }

    console.log("validação passou");

    try {
      setLoading(true);

      // -- envio de dados para API

      //requisição POST para rota do registro
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //conversão do JSON para ser enviado
        body: JSON.stringify({
          name: formData.name,
          lastName: formData.lastName,
          email: formData.email,
          birthDate: formData.birthDate,
          password: formData.password,
        }),
      });

      //conversão da resposta api em json
      const data = await response.json();

      //Se a resposta não for ok vai gerar um erro
      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar usuário");
      }

      // redirecionamento para página de login
      router.push("/");
      router.refresh();
    } catch (error) {
      //tratamento de erros
      if (error instanceof Error) {
        setError(error.message); //caso dê erro na API
      } else {
        setError("Erro desconhecido ao criar conta");
      }
    } finally {
      setLoading(false); //para de mostrar a tela de carregamento
    }
  };

  return (
    <main>
      <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-0">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Faça seu registro</CardTitle>
            <CardDescription>
              Adicione seus dados para realizar o cadastro.
            </CardDescription>
          </CardHeader>

          {/* Início do formulário de registro */}
          <form onSubmit={handleSubmit}>
            <CardContent>
              {/*Exibição dos erros*/}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-4">
                {/* NOME E SOBRENOME */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      type="string"
                      placeholder="João"
                      required
                      value={formData.name} //valor do estado
                      onChange={handleChange} // atualiza o estado quando muda
                      disabled={loading} // desabilita durante o carregamento
                    />
                    {fieldErrors.name && (
                      <p className="absolute text-sm text-red-600">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input
                      id="lastName"
                      type="string"
                      placeholder="Silva"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {fieldErrors.lastName && (
                      <p className="absolute text-sm text-red-600">
                        {fieldErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* EMAIL E DATA DE NASCIMENTO */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="string"
                      placeholder="m@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {fieldErrors.email && (
                      <p className="absolute text-sm text-red-600">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Calendar28
                      value={formData.birthDate}
                      onChange={handleDateChange}
                      disabled={loading}
                    />
                    {fieldErrors.birthDate && (
                      <p className="absolute text-sm text-red-600">
                        {fieldErrors.birthDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                    </div>
                    <Input
                      id="password"
                      placeholder="123456789"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {fieldErrors.password && (
                      <p className="absolute text-sm text-red-600">
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Confirme sua senha</Label>
                    </div>
                    <Input
                      id="confirmPassword"
                      placeholder="123456789"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {fieldErrors.confirmPassword && (
                      <p className="absolute text-sm text-red-600">
                        {fieldErrors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-6">
              <Button type="submit" className="w-full cursor-pointer">
                Registrar
              </Button>
              <Button variant="outline" className="w-full">
                Entrar com Google
              </Button>
              <Link
                href="/"
                className="text-sm underline-offset-4 hover:underline cursor-pointer"
              >
                Já possuo uma conta
              </Link>
            </CardFooter>
          </form>
          {/* Fim do formulário de registro */}
        </Card>
      </div>
    </main>
  );
}
