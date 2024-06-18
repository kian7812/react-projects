import React, { ChangeEvent, FormEvent, useState } from "react";
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";


export interface TodoInputProps {
  addTodo: (todo: string) => void;
}

export const AddToDo: React.FC<{
  addList: (text: string) => void
}> = ({ addList }) => {
  const [input, setInput] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      addList(input)
      setInput("")
    }
  }


  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-x-3 py-2">
      <motion.div layout className="flex-auto">
        <Input
          value={input}
          onChange={handleChange}
          placeholder="add your task"
        />
      </motion.div>

      {input && <Button type="submit">Add</Button>}
    </form>
  )

} 