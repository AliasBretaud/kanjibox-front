"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { InputProps } from "@mui/material";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type InputListProps<T> = Pick<InputProps, "disabled" | "required"> & {
  label: string;
  name: keyof T;
  errors?: number[];
  values?: string[];
  setValueAs?: (value: string) => string;
};

type ActionButtonProps = {
  index: number;
  count: number;
  name: string;
  addAction: () => void;
  deleteAction: () => void;
};

const DeleteButton = ({
  deleteAction,
}: Pick<ActionButtonProps, "deleteAction">) => (
  <IconButton
    aria-label="delete"
    size="small"
    color="error"
    onClick={deleteAction}
  >
    <RemoveIcon fontSize="inherit" />
  </IconButton>
);

const AddButton = ({
  addAction,
  testId,
}: Pick<ActionButtonProps, "addAction"> & { testId: string }) => (
  <IconButton
    aria-label="add"
    size="small"
    onClick={addAction}
    data-testId={testId}
  >
    <AddIcon fontSize="inherit" color="primary" />
  </IconButton>
);

const ActionButton = ({
  index,
  count,
  name,
  addAction,
  deleteAction,
}: ActionButtonProps) => {
  const addButton =
    index === count - 1 && count < 3 ? (
      <AddButton addAction={addAction} testId={`add-${name}-${index}`} />
    ) : (
      <Box minWidth={28} height={28} />
    );
  return count > 1 && index < count - 1 ? (
    <DeleteButton deleteAction={deleteAction} />
  ) : (
    addButton
  );
};

export function InputList<T>({
  errors,
  values: initValues,
  setValueAs,
  label,
  name,
  required,
  disabled,
}: InputListProps<T>) {
  const [values, setValues] = useState(initValues || [""]);

  const updateValue = (value: string, index: number) => {
    const newVal = setValueAs ? setValueAs(value) : value;
    const updatedvalues = [...values];
    updatedvalues.splice(index, 1, newVal);
    setValues(updatedvalues);
  };

  const removeValue = (index: number) => {
    const updatedvalues = [...values];
    updatedvalues.splice(index, 1);
    setValues(updatedvalues);
  };

  const addValue = () => setValues([...values, ""]);

  useEffect(() => {
    if (disabled) setValues([""]);
  }, [disabled]);

  return (
    <Stack gap={2}>
      {values.map((v, i) => (
        <Stack key={i} alignItems="center" direction="row" gap={2}>
          <TextField
            name={name as string}
            label={i === 0 ? label : undefined}
            value={v}
            placeholder={i !== 0 ? label : undefined}
            onChange={(e) => updateValue(e.target.value, i)}
            error={errors?.includes(i) && !disabled}
            fullWidth
            disabled={disabled}
            required={required && i === 0}
          />
          {!disabled ? (
            <ActionButton
              index={i}
              count={values.length}
              addAction={addValue}
              deleteAction={() => removeValue(i)}
              name={name as string}
            />
          ) : null}
        </Stack>
      ))}
    </Stack>
  );
}
