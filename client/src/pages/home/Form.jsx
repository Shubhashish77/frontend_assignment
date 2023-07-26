import React from "react";
import { Formik } from "formik";
import { styled } from "styled-components";
import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";


const StyledForm = styled.form`
   display: flex;
   gap: 2rem;
`;

const Wrapper = styled.div`
   display :flex;
   flex-direction: column;
`;

const Error = styled.div`
   color: red;
   font-size: 10px;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-brand-600);
    color: #fff;
    border-radius: 10px;
    height: 45px;
    padding: 2rem;
    &:hover{
        background-color: var(--color-brand-800);
    }

`;

const Form = ({ setQueryData, refetch, setEnabled }) => {

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    return (
        <div>
            <Formik
                initialValues={{ stockName: "", startDate: new Date(), endDate: new Date() }}
                validate={(values) => {
                    const errors = {};
                    if (!values.stockName) {
                        errors.stockName = "Required";
                    }
                    if (!values.startDate) {
                        errors.startDate = "Required";
                    } else if (new Date(values.startDate) > new Date(values.endDate)) {
                        errors.startDate = "Start Date must be less than end date";
                    }
                    if (!values.endDate) {
                        errors.endDate = "Required";
                    } else if (new Date(values.startDate) - new Date(values.endDate) >= 7) {
                        errors.endDate = "Date range must be less than equal to 7 ";
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values)
                    setTimeout(() => {
                        setQueryData((prevState) => ({ ...prevState, values }));
                        setSubmitting(false);
                        setEnabled(true);
                        // refetch();
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    isSubmitting,
                    handleSubmit,
                    handleReset
                    /* and other goodies */
                }) => (
                    <StyledForm onSubmit={handleSubmit}>
                        <Wrapper>
                            <TextField
                                id="stockName"
                                name="stockName"
                                label="Stock Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                variant="outlined"
                                value={values.stockName}

                            />
                            {(errors.stockName) && <Error>{errors.stockName}</Error>}
                        </Wrapper>
                        <Wrapper>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DatePicker
                                    selected={values.startDate}
                                    dateFormat="MMMM d, yyyy"
                                    name="startDate"
                                    label="Start Date"
                                    onChange={date => setFieldValue('startDate', formatDate(date))}
                                    onBlur={handleBlur}

                                />

                            </LocalizationProvider>
                            {(errors.startDate) && <Error>{errors.startDate}</Error>}
                        </Wrapper>
                        <Wrapper>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DatePicker
                                    selected={values.endDate}
                                    dateFormat="MMMM d, yyyy"
                                    name="endDate"
                                    label="End Date"
                                    onChange={date => setFieldValue('endDate', formatDate(date))}
                                    onBlur={handleBlur}

                                />

                            </LocalizationProvider>
                            {errors.endDate && <Error>{errors.endDate}</Error>}
                        </Wrapper>
                        <Button type="submit" className="btn btn-lg btn-outline-success mt-4 mb-4" disabled={isSubmitting}>Submit</Button>
                    </StyledForm>
                )}
            </Formik>
        </div >
    );
};


export default Form;
