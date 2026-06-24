import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { categoryType } from "@/types/category";



interface Props extends categoryType {
    isChecked: boolean
    onFilterChange: (slug: string) => void;
}

export default function FilterCategory({ slug, name, onFilterChange, isChecked }: Props) {

    return (

        <Field orientation="horizontal">
            <Checkbox id={slug} checked={isChecked} name={slug} onCheckedChange={() => onFilterChange(slug)} />
            <FieldLabel htmlFor={slug}>
                {name}
            </FieldLabel>
        </Field>
    )
}
