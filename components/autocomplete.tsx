import React, { useState, Fragment } from "react";
import { Autocomplete,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    createFilterOptions, 
    Dialog} from "@mui/material";

interface IAutocompleText {
    inputValue?: string
    text: string
}

const textFilter = createFilterOptions<IAutocompleText>();

const socialCuesArray: IAutocompleText[] = [
  {text: "How to behave in a work setting"}
]

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

      return (
        <Fragment>
          <Autocomplete>
            value={value}
            onChange={(event, newValue: any) => {
              if (typeof newValue == "string") {
                setTimeout(() => {
                  toggleOpen(true);
                  setDialogValue({
                    text: newValue
                  });
                });
              }

              else if (newValue && newValue.inputValue) {
                toggleOpen(true);
                setDialogValue({
                  text: newValue
                });
              }

              else {
                setValue(newValue)
              }
            }}

            filterOtions={(options, params) => {
              const filtered = textFilter(options, params)

              if (params.inputValue != "") {
                filtered.push({
                  inputValue: params.inputValue,
                  text: `Add "${params.inputValue}"`
                })
              }

              return filtered;
            }}

            id="autocomplete-social-cues-textfield"
            options={socialCuesArray}
            getOptionLabel={(option) => {
              if (typeof option == "string") {
                return option;
              }

              if (option.inputValue) {
                return option.inputValue;
              }

              return option.text;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(props: any, option: any) => <li {...props}>{option.text}</li>}
            freeSolo
            renderInput={(params: any) => <TextField {...params} label="Social Cues Dialog" />}
          </Autocomplete>
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>Add a new Social Cue</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Feel free to add your own social cue here!
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={getDialogValue.text}
                  onChange={(event) =>
                    setDialogValue({
                      ...getDialogValue,
                      text: event.target.value,
                    })
                  }
                  label="socialCuesText"
                  type="text"
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
              </DialogActions>
            </form>
          </Dialog>
        </Fragment>
      );
}