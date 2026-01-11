import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/dist/client/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-0">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Encontre sua conta</CardTitle>
          <CardDescription>
            Insira seu email para procurar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Inicio do formulário de esqueci a senha */}
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
            </div>
          </form>
          {/* Fim do formulário de esqueci a senha */}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Pesquisar
          </Button>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full cursor-pointer">
              Cancelar
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
