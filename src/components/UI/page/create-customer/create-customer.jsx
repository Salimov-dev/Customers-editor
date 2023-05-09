import React, { useEffect, useState } from "react";
// styles
import "./create-customer.css";
// libraries
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
// components
import RemoveNewField from "../../../common/button/remove-new-field/remove-new-field";
import MetadaKeyField from "../../../common/button/metada-key-field/metada-key-field";
import DeleteButton from "../../../common/button/delete-button/delete-button";
import InputFieldRemovable from "../../../common/form/input-field-removable";
import AddNewField from "../../../common/button/add-new-field/add-new-field";
import InputField from "../../../common/form/input-field";
import Button from "../../../common/button/buttons";
import Switcher from "../../../common/form/switcher";
// store
import { createCustomer } from "../../../../store/customer.store";
// utils
import DateNow from "../../../../utils/date-now";
import AccordeonInitialState from "../../../../utils/accordeon-initial-state";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Имя обязательно для заполнения")
    .matches(/^([^0-9]*$)/, "Имя не должно содержать цифры"),
  email: yup
    .string()
    .required("Email обязателен для заполнения")
    .email("Введите корректный email"),
  balance: yup.object().shape({
    available_amount: yup
      .string()
      .required("Обязательно укажите кол-во дней отсрочки"),
    credit_limit: yup.string().required("Укажите кредитный лимит"),
  }),
  org: yup.object().shape({
    name: yup
      .string()
      .required("Название организации обязательно для заполнения"),
    inn: yup.string().required("Укажите ИНН организации"),
    kpp: yup.string().required("Укажите КПП организации"),
    ogrn: yup.string().required("Укажите ОГРН организации"),
    addr: yup.string().required("Укажите юридический адрес организации"),
    bank_accounts: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Введите название счета"),
        account_number: yup.string().required("Введите номер счета"),
        bik: yup.string().required("Введите БИК счета"),
        corr_account_number: yup.string().required("Введите корр. номер счета"),
      })
    ),
  }),
  invoice_emails: yup.array().of(
    yup.object().shape({
      email: yup
        .string()
        .required("Email обязателен для заполнения")
        .email("Введите корректный email"),
    })
  ),
});

const CreateCustomer = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      org: {
        name: "",
        inn: "",
        kpp: "",
        ogrn: "",
        addr: "",
        bank_accounts: [
          {
            name: "",
            bik: "",
            account_number: "",
            corr_account_number: "",
            is_default: true,
          },
        ],
      },
      balance: {
        currency: "RUB",
        current_amount: 0,
        credit_limit: "",
        available_amount: "",
      },
      invoice_emails: [{ email: "" }],
      metadata: [{ keyName: "", keyValue: "" }],
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState, reset, watch } = form;
  const dispatch = useDispatch();
  const { errors, isValid } = formState;

  const {
    fields: fieldInvoiceEmails,
    append: appenInvoiceEmails,
    remove: removeInvoiceEmails,
  } = useFieldArray({
    name: "invoice_emails",
    control,
  });

  const {
    fields: fieldBankAccounts,
    append: appenBankAccounts,
    remove: removeBankAccounts,
  } = useFieldArray({
    name: "org.bank_accounts",
    control,
  });

  const {
    fields: fieldMetaData,
    append: appenMetaData,
    remove: removeMetaData,
  } = useFieldArray({
    name: "metadata",
    control,
  });

  const transformData = (data) => {
    const newCustomer = {
      ...data,
      _id: nanoid(),
      created_at: DateNow(),
      updated_at: "",
    };
    return newCustomer;
  };

  const onSubmit = (data) => {
    dispatch(createCustomer(transformData(data))).then(reset());
  };

  const createCustomerModal = document.getElementById("createCustomer");
  createCustomerModal?.addEventListener("hidden.bs.modal", function () {
    AccordeonInitialState();
    reset();
  });

  const handleAccordeonInitialState = () => {
    AccordeonInitialState();
  };
  const banksAccountsCheckedArray = watch("org.bank_accounts");

  const toggleChecked = (index) => {
    console.log("index", index);

    const watchIsDefault = watch(`org.bank_accounts.${index}.is_default`);
    console.log(
      "watchIsDefault",
      `org.bank_accounts.${index} :`,
      !watchIsDefault
    );
    return true;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="create-customer__form"
      >
        <div className="accordion" id="accordionCreate">
          <div className="accordion-item">
            <h2 className="accordion-header" id="clientDetail">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseClientDetail"
                aria-expanded="true"
                aria-controls="collapseClientDetail"
              >
                Детали клиента
              </button>
            </h2>
            <div
              id="collapseClientDetail"
              className="accordion-collapse collapse show"
              aria-labelledby="clientDetail"
              data-bs-parent="#accordionCreate"
            >
              <div className="accordion-body">
                <InputField
                  {...register("name")}
                  register={register}
                  label="Имя"
                  name="name"
                  placeholder="Введите имя клиента"
                  error={!!errors.name}
                  errorMessage={errors?.name?.message}
                />
                <InputField
                  {...register("email")}
                  register={register}
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Введите email клиента"
                  error={!!errors.email}
                  errorMessage={errors?.email?.message}
                />
                <InputField
                  {...register("balance.available_amount")}
                  register={register}
                  type="number"
                  label="Дней отсрочки"
                  placeholder="Введите кол-во дней отсрочки"
                  name="balance.available_amount"
                  error={!!errors?.balance?.available_amount}
                  errorMessage={errors?.balance?.available_amount?.message}
                />
                <InputField
                  {...register("balance.credit_limit")}
                  label="Кредитный лимит"
                  type="number"
                  placeholder="Введите размер кредитного лимита"
                  name="balance.credit_limit"
                  register={register}
                  error={!!errors.balance?.credit_limit}
                  errorMessage={errors?.balance?.credit_limit?.message}
                />
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="organizationDetail">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOrganizationDetail"
                aria-expanded="false"
                aria-controls="collapseOrganizationDetail"
              >
                Детали организации
              </button>
            </h2>
            <div
              id="collapseOrganizationDetail"
              className="accordion-collapse collapse"
              aria-labelledby="organizationDetail"
              data-bs-parent="#accordionCreate"
            >
              <div className="accordion-body">
                <InputField
                  {...register("org.name")}
                  register={register}
                  label="Название организации"
                  placeholder="Введите название организации"
                  name="org.name"
                  error={!!errors?.org?.name}
                  errorMessage={errors?.org?.name?.message}
                />
                <InputField
                  {...register("org.inn")}
                  register={register}
                  type="number"
                  label="ИНН организации"
                  placeholder="Введите ИНН организации"
                  name="org.inn"
                  error={!!errors?.org?.inn}
                  errorMessage={errors?.org?.inn?.message}
                />
                <InputField
                  {...register("org.kpp")}
                  register={register}
                  type="number"
                  label="КПП организации"
                  placeholder="Введите КПП организации"
                  name="org.kpp"
                  error={!!errors?.org?.kpp}
                  errorMessage={errors?.org?.kpp?.message}
                />
                <InputField
                  {...register("org.ogrn")}
                  register={register}
                  type="number"
                  label="ОГРН организации"
                  placeholder="Введите ОГРН организации"
                  name="org.ogrn"
                  error={!!errors?.org?.ogrn}
                  errorMessage={errors?.org?.ogrn?.message}
                />
                <InputField
                  {...register("org.addr")}
                  register={register}
                  label="Юридический адрес"
                  placeholder="Введите юридический адрес"
                  name="org.addr"
                  error={!!errors?.org?.addr}
                  errorMessage={errors?.org?.addr?.message}
                />
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="bankAccounts">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseBankAccounts"
                aria-expanded="false"
                aria-controls="collapseBankAccounts"
              >
                Банковские счета
              </button>
            </h2>
            <div
              id="collapseBankAccounts"
              className="accordion-collapse collapse"
              aria-labelledby="bankAccounts"
              data-bs-parent="#accordionCreate"
            >
              <div className="accordion-body">
                {fieldBankAccounts.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <div className="d-flex justify-content-start align-items-start w-100">
                        <div className="w-50">
                          <InputField
                            {...register(`org.bank_accounts.${index}.name`)}
                            name={`org.bank_accounts.${index}.name`}
                            register={register}
                            type="text"
                            label="Название счета"
                            placeholder="Введите название счета"
                            error={
                              !!errors?.org?.bank_accounts
                                ? !!errors?.org?.bank_accounts[index]?.name
                                : ""
                            }
                            errorMessage={
                              !!errors?.org?.bank_accounts
                                ? errors?.org?.bank_accounts[index]?.name
                                    ?.message
                                : ""
                            }
                          />
                          <InputField
                            {...register(
                              `org.bank_accounts.${index}.account_number`
                            )}
                            name={`org.bank_accounts.${index}.account_number`}
                            register={register}
                            type="number"
                            label="Номер счета"
                            placeholder="Введите номер счета"
                            error={
                              !!errors?.org?.bank_accounts
                                ? !!errors?.org?.bank_accounts[index]
                                    ?.account_number
                                : ""
                            }
                            errorMessage={
                              !!errors?.org?.bank_accounts
                                ? errors?.org?.bank_accounts[index]
                                    ?.account_number?.message
                                : ""
                            }
                          />
                          <InputField
                            {...register(`org.bank_accounts.${index}.bik`)}
                            name={`org.bank_accounts.${index}.bik`}
                            register={register}
                            type="number"
                            label="БИК счета"
                            placeholder="Введите БИК счета"
                            error={
                              !!errors?.org?.bank_accounts
                                ? !!errors?.org?.bank_accounts[index]?.bik
                                : ""
                            }
                            errorMessage={
                              !!errors?.org?.bank_accounts
                                ? errors?.org?.bank_accounts[index]?.bik
                                    ?.message
                                : ""
                            }
                          />
                          <InputField
                            {...register(
                              `org.bank_accounts.${index}.corr_account_number`
                            )}
                            name={`org.bank_accounts.${index}.corr_account_number`}
                            register={register}
                            type="number"
                            label="Корр. номер счета"
                            placeholder="Введите коореспондентский номер счета"
                            error={
                              !!errors?.org?.bank_accounts
                                ? !!errors?.org?.bank_accounts[index]
                                    ?.corr_account_number
                                : ""
                            }
                            errorMessage={
                              !!errors?.org?.bank_accounts
                                ? errors?.org?.bank_accounts[index]
                                    ?.corr_account_number?.message
                                : ""
                            }
                          />

                          <Switcher
                            {...register(
                              `org.bank_accounts.${index}.is_default`
                            )}
                            name="switcher"
                            register={register}
                            label="Дефолтный счёт"
                            disabled={
                              banksAccountsCheckedArray.length > 1
                                ? false
                                : true
                            }
                            onClick={() => toggleChecked(index)}
                          />
                        </div>

                        {index > 0 && (
                          <RemoveNewField
                            onClick={removeBankAccounts}
                            text="Удалить счёт"
                          />
                        )}
                      </div>
                      <hr />
                    </div>
                  );
                })}

                <AddNewField
                  onClick={() => appenBankAccounts({ is_default: false })}
                  text="Добавить еще счёт"
                />
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="invoiceEmails">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseInvoiceEmails"
                aria-expanded="false"
                aria-controls="collapseInvoiceEmails"
              >
                Email для счетов
              </button>
            </h2>
            <div
              id="collapseInvoiceEmails"
              className="accordion-collapse collapse"
              aria-labelledby="invoiceEmails"
              data-bs-parent="#accordionCreate"
            >
              <div className="accordion-body">
                {fieldInvoiceEmails.map((field, index) => {
                  return (
                    <InputFieldRemovable
                      {...register(`invoice_emails.${index}.email`)}
                      register={register}
                      label="Email"
                      placeholder="Введите электронную почту"
                      fields="invoice_emails"
                      field="email"
                      name={`invoice_emails.${index}.email`}
                      index={index}
                      key={index}
                      onClick={() => removeInvoiceEmails(index)}
                      error={
                        errors?.invoice_emails
                          ? !!errors?.invoice_emails[index]?.email
                          : ""
                      }
                      errorMessage={
                        errors?.invoice_emails
                          ? errors?.invoice_emails[index]?.email?.message
                          : ""
                      }
                    />
                  );
                })}
                <AddNewField
                  onClick={() => appenInvoiceEmails()}
                  text="Добавить еще Email"
                />
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="meta">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseMeta"
                aria-expanded="false"
                aria-controls="collapseMeta"
              >
                Meta
              </button>
            </h2>
            <div
              id="collapseMeta"
              className="accordion-collapse collapse"
              aria-labelledby="meta"
              data-bs-parent="#accordionCreate"
            >
              <div className="accordion-body">
                <table className="table table-bordered border-secondary">
                  <thead>
                    <tr>
                      <th scope="col">Ключ</th>
                      <th scope="col">Значение</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {fieldMetaData.map((field, index) => {
                      return (
                        <tr key={field.id}>
                          <td>
                            <MetadaKeyField
                              {...register(`metadata.${index}.keyName`)}
                              register={register}
                              placeholder="Введите название ключа"
                              fields="metadata"
                              field="keyName"
                              name={`metadata.${index}.keyName`}
                              index={index}
                              key={index}
                            />
                          </td>
                          <td>
                            <MetadaKeyField
                              {...register(`metadata.${index}.keyValue`)}
                              register={register}
                              placeholder="Введите значение ключа"
                              fields="metadata"
                              field="keyValue"
                              name={`metadata.${index}.keyValue`}
                              index={index}
                              key={index}
                            />
                          </td>
                          <td className="create-customer__delete-td">
                            <DeleteButton
                              onClick={() => removeMetaData(index)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <AddNewField
                  onClick={() => appenMetaData()}
                  text="Добавить еще ключ"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between pt-2 gap-1">
          <Button
            type="submit"
            text="Создать"
            styleBtn="primary"
            dataBsDismiss="modal"
            onClick={handleAccordeonInitialState}
            disabled={!isValid}
          />
          <Button
            type="button"
            text="Закрыть"
            styleBtn="danger"
            dataBsDismiss="modal"
            onClick={handleAccordeonInitialState}
          />
        </div>
      </form>

      <DevTool control={control} />
    </>
  );
};

export default CreateCustomer;
