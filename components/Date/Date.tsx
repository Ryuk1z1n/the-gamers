"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDateForInput(date: Date | undefined) {
  if (!date) {
    return "";
  }

  // Formato YYYY-MM-DD para o input type="date"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

interface Calendar28Props {
  value?: string; // Valor no formato YYYY-MM-DD
  onChange?: (date: string) => void; // Retorna a data no formato YYYY-MM-DD
  disabled?: boolean;
}

export function Calendar28({
  value = "",
  onChange,
  disabled = false,
}: Calendar28Props) {
  const [open, setOpen] = React.useState(false);

  // Converte a string para Date
  const getDateFromValue = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    const date = new Date(dateString);
    return isValidDate(date) ? date : undefined;
  };

  const [date, setDate] = React.useState<Date | undefined>(
    getDateFromValue(value)
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [displayValue, setDisplayValue] = React.useState(formatDate(date));

  // Atualiza quando o valor externo muda
  React.useEffect(() => {
    const newDate = getDateFromValue(value);
    setDate(newDate);
    setMonth(newDate);
    setDisplayValue(formatDate(newDate));
  }, [value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setDisplayValue(formatDate(selectedDate));

    // Notifica o componente pai com a data no formato YYYY-MM-DD
    if (selectedDate && onChange) {
      const formattedDate = formatDateForInput(selectedDate);
      onChange(formattedDate);
    }

    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);

    // Tenta parsear a data digitada
    const parsedDate = new Date(inputValue);
    if (isValidDate(parsedDate)) {
      setDate(parsedDate);
      setMonth(parsedDate);
      if (onChange) {
        onChange(formatDateForInput(parsedDate));
      }
    }
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="date" className="font-normal text-base">
        Nascimento
      </Label>
      <div className="relative">
        <Input
          id="birthDate"
          value={displayValue}
          placeholder="01 de junho de 2025"
          className="bg-background pr-10"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          disabled={disabled}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute inset-y-0 right-0 size-9 flex items-center justify-center"
              disabled={disabled}
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
              disabled={(date) => {
                // Desabilita datas futuras (não pode nascer no futuro)
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date > today;
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
