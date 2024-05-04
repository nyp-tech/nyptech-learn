
import { SimpleForm, Create, TextInput, required, ReferenceField, ReferenceInput, NumberInput } from 'react-admin';

export const UnitCreate = () => {
    return (

        <Create>
            <SimpleForm>
                <TextInput source="title" validate={[required()]} label="Title" />
                <TextInput source="description" validate={[required()]} label="description" />
                <ReferenceInput
                    source="course_id"
                    reference="courses" />
                <NumberInput source="order"
                 validate={[required()]} label="order" />

            </SimpleForm>
        </Create>

    )
};