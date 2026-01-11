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
import { Metadata } from "next";
import Link from "next/dist/client/link";

export const metadata: Metadata = {
  title: "Registro",
};

export default function RegisterPage() {
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
          <CardContent>
            {/* Início do formulário de registro */}
            <form>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      type="string"
                      placeholder="João"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="middle-name">Sobrenome</Label>
                    <Input
                      id="middle-name"
                      type="string"
                      placeholder="Silva"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="string"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Calendar28 />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                    </div>
                    <Input
                      id="password"
                      placeholder="***********"
                      type="password"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Confirme sua senha</Label>
                    </div>
                    <Input
                      id="password"
                      placeholder="***********"
                      type="password"
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
            {/* Fim do formulário de registro */}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
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
        </Card>
      </div>
    </main>
  );
}
