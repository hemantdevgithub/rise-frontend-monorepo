import HeadingText from "@/components/Shared/HeadingText";
import { useUpdateBasicProfileMutation } from "@/redux/features/basicProfile/basicProfileApi";
import { updateBasicProfileValidation } from "@/schemas/basicProfileValidation";
import { TBasicProfile } from "@/types/basicProfile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, Input,
  PhoneInput
} from "@repo/ui";
import { useEffect, useMemo, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

export type BasicProfileUpdateFormValues = z.infer<
  typeof updateBasicProfileValidation
>;

const BasicDetailUpdateForm = ({
  profile,
  email,
}: {
  profile: TBasicProfile | undefined;
  email: string;
}) => {
  // redux hooks
  const [updateBasicProfile] = useUpdateBasicProfileMutation();

  // default values
  const current_addressDefaultValues = useMemo(
    () => ({
      country: profile?.current_address?.country || "",
      state: profile?.current_address?.state || "",
      city: profile?.current_address?.city || "",
      zip_code: profile?.current_address?.zip_code || "",
      address_line: profile?.current_address?.address_line || "",
    }),
    [profile]
  );

  const permanent_addressDefaultValues = useMemo(
    () => ({
      country: profile?.permanent_address?.country || "",
      state: profile?.permanent_address?.state || "",
      city: profile?.permanent_address?.city || "",
      zip_code: profile?.permanent_address?.zip_code || "",
      address_line: profile?.permanent_address?.address_line || "",
    }),
    [profile]
  );

  const basicProfileDefaultValues = useMemo(
    () => ({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      phone_number: profile?.phone_number || "",
      current_address: current_addressDefaultValues,
      permanent_address: permanent_addressDefaultValues || "",
    }),
    [
      current_addressDefaultValues,
      permanent_addressDefaultValues,
      profile?.first_name,
      profile?.last_name,
      profile?.phone_number,
    ]
  );

  const form: UseFormReturn<BasicProfileUpdateFormValues> = useForm<
    z.infer<typeof updateBasicProfileValidation>
  >({
    resolver: zodResolver(updateBasicProfileValidation),
    defaultValues: basicProfileDefaultValues,
  });

  const [addressStatus, setAddressStatus] = useState(false);

  const { reset, setValue, watch } = form;

  // Reset the form values when the profile prop changes
  useEffect(() => {
    reset(basicProfileDefaultValues);
  }, [basicProfileDefaultValues, profile, reset]);

  // Watch for changes to the current address and update permanent address if checkbox is checked
  useEffect(() => {
    if (addressStatus) {
      const currentAddress = watch("current_address");
      setValue("permanent_address", currentAddress);
    }
  }, [addressStatus, setValue, watch]);

  const handleUpdateBasicProfile = async (
    values: z.infer<typeof updateBasicProfileValidation>
  ) => {
    const toastId = toast.loading("Updating basic profile...", {
      duration: 3000,
    });

    try {
      if (addressStatus) {
        values.permanent_address = values.current_address;
      }
      const result = await updateBasicProfile(values).unwrap();
      if (result.success) {
        toast.success("Basic profile updated successfully.", { id: toastId });
      }
    } catch (error) {
      toast.error("There was an error updating basic profile.", {
        id: toastId,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateBasicProfile)}
        className="space-y-5"
      >
        <div className="flex items-center justify-between">
          <HeadingText>Basic Details</HeadingText>

          <Button className="flex gap-3" variant={"outline"}>
            Save Changes
            <FaSave />
          </Button>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-roboto text-sm font-semibold">
                    First Name
                  </FormLabel>
                  <Input
                    {...field}
                    className="h-9 px-5"
                    placeholder="First Name"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-roboto text-sm font-semibold">
                    Last Name
                  </FormLabel>
                  <Input
                    {...field}
                    className="h-9 px-5"
                    placeholder="Last Name"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-1">
              <label>Email</label>
              <Input
                value={email}
                disabled
                className="h-9 px-5"
                placeholder="Email Address"
              />
            </div>
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="mt-[5px] flex flex-col items-start">
                  <FormLabel className="mb-1 text-left">Phone Number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      className=""
                      placeholder="Enter a phone number"
                      {...field}
                      international
                      defaultCountry="IN"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/*  Current Address  */}
        <div className="space-y-5 rounded-md border p-5">
          <p>Current Address</p>
          <div className="items-top flex space-x-2">
            <Checkbox
              id="terms1"
              checked={addressStatus}
              onCheckedChange={(e) => setAddressStatus(e as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Current Address same as Permanent Address
              </label>
            </div>
          </div>
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="current_address.address_line"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-roboto text-sm font-semibold">
                    Address Line
                  </FormLabel>
                  <Input
                    {...field}
                    className="h-9 px-5"
                    placeholder="Address Line"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="current_address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-roboto text-sm font-semibold">
                      Country
                    </FormLabel>
                    <Input
                      {...field}
                      className="h-9 px-5"
                      placeholder="Country"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="current_address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-roboto text-sm font-semibold">
                      State
                    </FormLabel>
                    <Input
                      {...field}
                      className="h-9 px-5"
                      placeholder="State"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="current_address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-roboto text-sm font-semibold">
                      City
                    </FormLabel>
                    <Input {...field} className="h-9 px-5" placeholder="City" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="current_address.zip_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-roboto text-sm font-semibold">
                      Zip Code
                    </FormLabel>
                    <Input
                      {...field}
                      className="h-9 px-5"
                      placeholder="Zip Code"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/*  Permanent Address  */}
        {!addressStatus && (
          <div className="space-y-5 rounded-md border p-5">
            <p>Permanent Address</p>
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="permanent_address.address_line"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-roboto text-sm font-semibold">
                      Address Line
                    </FormLabel>
                    <Input
                      {...field}
                      className="h-9 px-5"
                      placeholder="Address Line"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="permanent_address.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-roboto text-sm font-semibold">
                        Country
                      </FormLabel>
                      <Input
                        {...field}
                        className="h-9 px-5"
                        placeholder="Country"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="permanent_address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-roboto text-sm font-semibold">
                        State
                      </FormLabel>
                      <Input
                        {...field}
                        className="h-9 px-5"
                        placeholder="State"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="permanent_address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-roboto text-sm font-semibold">
                        City
                      </FormLabel>
                      <Input
                        {...field}
                        className="h-9 px-5"
                        placeholder="City"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="permanent_address.zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-roboto text-sm font-semibold">
                        Zip Code
                      </FormLabel>
                      <Input
                        {...field}
                        className="h-9 px-5"
                        placeholder="Zip Code"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};

export default BasicDetailUpdateForm;
