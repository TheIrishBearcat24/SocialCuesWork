import React, { useState, Fragment } from "react";
import { Autocomplete,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    createFilterOptions } from "@mui/material";

interface IAutocompleText {
    text: string
}

const textFilter = createFilterOptions<IAutocompleText>();

export default function createAddableAutocompleteBox() {
    const [getValue, setValue] = useState<IAutocompleText | null>(null)
    const [open, toggleOpen] = useState(false)

    const handleClose = () => {
        setDialogValue({
          text: ""
        });
        toggleOpen(false);
      };

      const [getDialogValue, setDialogValue] = useState({
        text: ""
      })

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValue({
            text: getDialogValue.text
        });

        handleClose();
      };

      return null
}