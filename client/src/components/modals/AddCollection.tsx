import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addCollectionSchema } from "../../config/schema";
import Input from "../ui/inputs/Input";
import Notif from "./Notif";

type Props = {
  handleToggleAddCollectionModal: () => void;
};

export default function AddCollection({
  handleToggleAddCollectionModal,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(addCollectionSchema),
  });
  const [showNotif, setShowNotif] = useState<boolean>(false);
  const [resMsg, setResMsg] = useState<{ msg: string; status: number }>();

  function onSubmit(data: any) {
    console.log("submitting");

    fetch("http://localhost:8000/save-collection", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        details: data.details,
        originalUrl: data.original_url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: { msg: string; status: number }) => {
        console.log(data);

        // show the notif
        setShowNotif(true);
        // remove the notif in span of 2s
        setTimeout(() => setShowNotif(false), 2000);

        if (data.status === 200) {
          setResMsg(data);
          reset();
        }
        setResMsg(data);
      })
      .catch((err) => {
        console.log(err);
        setResMsg({ msg: err, status: 500 });
      });
  }

  return (
    <div className="fixed w-100 h-100 top-0 left-0 right-0 bottom-0 bg-primary-black bg-opacity-60 flex items-center justify-center">
      {showNotif && <Notif resMsg={resMsg} />}
      <form
        className="w-320 rounded-lg bg-secondary-black text-white p-5 flex flex-col items-start"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="text-lg text-white font-bold">
          <i className="fa-solid fa-folder-plus text-grayish text-2xl mr-2"></i>
          Create New Collection
        </div>
        <label className="text-white my-2 w-full">
          Name
          <p className="text-grays mb-2 text-xs">
            put a name to this collection
          </p>
          <Input
            name="name"
            placeholder="Type in here.."
            register={register}
            error={errors.name?.message}
          />
        </label>
        <label className="text-white my-2 w-full">
          Original URL
          <p className="text-grays mb-2 text-xs">
            paste the url you want to be shorten
          </p>
          <Input
            name="original_url"
            placeholder="Type in here.."
            register={register}
            error={errors.original_url?.message}
          />
        </label>
        <label className="text-white my-2 w-full">
          Details
          <p className="text-grays mb-2 text-xs">tell more about the link</p>
          <textarea
            {...register("details", { required: true, max: 100 })}
            className="rounded bg-slate-100 w-full my-2 p-2 text-primary-black block max-h-32"
            placeholder="Type in here.."
          ></textarea>
          {errors.details?.message && (
            <p className="text-red-600 text-left text-xs m-2 mt-0">{`${errors.details.message}`}</p>
          )}
        </label>
        <div className="text-white self-end mt-5">
          <button
            type="button"
            onClick={handleToggleAddCollectionModal}
            className="text-sm text-grayish cursor-pointer"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <input
            type="submit"
            value="Save"
            className="bg-dark-green p-2 rounded ml-5 cursor-pointer"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
