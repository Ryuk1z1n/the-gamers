import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-0">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Faça login em sua conta</CardTitle>
            <CardDescription>
              Digite seu e-mail abaixo para fazer login na sua conta.
            </CardDescription>
            <CardAction>
              <Link href="/register-page" className="cursor-pointer">
                <Button variant="link" className="cursor-pointer">
                  Cadastre-se
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            {/* Inicio do formulário de login */}
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <Link
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer"
                      href="/forgot-password"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    placeholder="***********"
                    type="password"
                    required
                  />
                </div>
              </div>
            </form>
            {/* Fim do formulário de login */}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full cursor-pointer">
              Entrar
            </Button>
            <Button variant="outline" className="w-full cursor-pointer">
              Entrar com o Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
