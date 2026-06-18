import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const types = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
};

function Form({ formControls, ButtonText, onSubmit, formData, setFormData }) {
  function renderInputsByComponentType(controlItem) {
    let element = "";
    let value = formData[controlItem.name];

    switch (controlItem.componentType) {
      case types.INPUT:
        element = (
          <Input
            name={controlItem.name}
            id={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case types.SELECT:
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [controlItem.name]: value })
            }
            value={value}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options && controlItem.options?.length > 0
                ? controlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case types.TEXTAREA:
        element = (
          <Textarea
            name={controlItem.name}
            id={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            value={value}
          />
        );
        break;

      default:
        <Input
          name={controlItem.name}
          id={controlItem.name}
          placeholder={controlItem.placeholder}
          type={controlItem.type}
          value={value}
          onChange={(event) =>
            setFormData({
              ...formData,
              [controlItem.name]: event.target.value,
            })
          }
        />;
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {ButtonText || "submit"}
      </Button>
    </form>
  );
}

export default Form;
