import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Partials/Layout";
import InputCom from "../components/Helpers/Inputs/InputCom";
import { createRoom } from "../lib/apis/room";

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      toast.success("Room created successfully!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const maxSolAmount = e.target.maxSolAmount.value;
    const max = e.target.max.value;
    const description = e.target.description.value;

    if (!name || maxSolAmount <= 0 || max <= 0) {
      toast.error("Invalid Input arguments!");
      return;
    }

    mutate({
      name,
      maxSolAmount,
      max,
      owner: "Nuoanunu",
      owned: true,
      "24h": 0,
      members: 0,
      value: 0,
      description,
    });
  };

  return (
    <>
      <Layout>
        <div className="w-full mb-10">
          <div className="main-wrapper w-full">
            <div className="mb-4 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-bold text-dark-gray dark:text-white">
                Create new Room
              </h1>
            </div>
            <div className="w-full bg-white dark:bg-dark-white section-shadow rounded-2xl lg:px-9 px-4 lg:pt-9 pt-5 ">
              <form onSubmit={handleSubmit}>
                <div className="field w-full mb-4 sm:mb-6">
                  <h1 className="field-title">Room Name</h1>
                  <div className="input-field mt-2">
                    <InputCom type="text" name="name" />
                  </div>
                </div>
                <div className="field w-full mb-4 sm:mb-6">
                  <h1 className="field-title">Description</h1>
                  <div className="input-field mt-2">
                    <div className="input-wrapper w-full ">
                      <textarea
                        name="description"
                        placeholder="provide a detailed description of your room."
                        rows="6"
                        className="text-sm placeholder:text-sm sm:placeholder:text-base sm:text-base w-full h-full px-4 sm:px-6 py-4 border border-light-purple dark:border-[#5356fb29] rounded-[20px] text-dark-gray dark:text-white bg-[#FAFAFA] dark:bg-[#11131F] focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:flex space-y-4 sm:space-y-0 sm:space-x-8">
                  <div className="sm:w-1/2 w-full mb-2 sm:mb-0">
                    <h1 className="field-title">Maximum Amount</h1>
                    <div className="input-field my-2">
                      <div className="input-wrapper border border-light-purple dark:border-[#5356fb29] w-full rounded-[50px] h-[58px] flex items-center overflow-hidden">
                        <input
                          placeholder="enter the max total amount of Sol for the room"
                          className="input-field text-sm placeholder:text-sm sm:placeholder:text-base sm:text-base px-4 sm:px-6 text-dark-gray dark:text-white w-10/12 h-full bg-[#FAFAFA] dark:bg-[#11131F] focus:ring-0 focus:outline-none"
                          type="number"
                          name="maxSolAmount"
                        />
                        <div className="w-[1px] h-[33px] bg-light-purple dark:bg-dark-light-purple "></div>
                        <div className="flex-1 flex h-full justify-center items-center bg-[#FAFAFA] dark:bg-[#11131F] ">
                          <div className="flex items-center">
                            <span className="text-dark-gray dark:text-white text-sm sm:text-base">
                              SOL
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sm:w-1/2 w-full mb-2 sm:mb-0">
                    <h1 className="field-title">Maximum Keys</h1>
                    <div className="input-field my-2">
                      <InputCom
                        type="number"
                        name="max"
                        placeholder="enter the max number of members/keys"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full mt-8 h-[120px] bg-red border-t border-light-purple dark:border-[#5356fb29] flex justify-center items-center">
                  <button
                    type="submit"
                    className="px-8 py-2 sm:py-3 sm:px-12 flex justify-center items-center btn-gradient text-xl sm:text-2xl rounded-full text-white"
                  >
                    Create Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateRoomPage;
