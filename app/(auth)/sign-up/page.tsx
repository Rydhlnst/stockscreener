"use client"

import { CountrySelectField } from '@/components/forms/CountrySelectField'
import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import SelectField from '@/components/forms/SelectField'
import { Button } from '@/components/ui/button'
import { signUpWithEmail } from '@/lib/actions/auth.action'
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constans'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm,  } from 'react-hook-form'
import { toast } from 'sonner'

const SignUpPage = () => {

  const router = useRouter()

  const [isSubmitting, ] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "ID",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology"
    },
    mode: "onBlur"
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log("Submitting data:", data);
      const result = await signUpWithEmail(data);
      console.log("Result:", result);

      if (result?.success) {
        console.log("Redirecting...");
        router.push("/");
      } else {
        console.log("Sign up failed or no success flag");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Sign Up Failed", {
        description:
          error instanceof Error ? error.message : JSON.stringify(error),
      });
    }
  };

  return (
    <div>
      <h1 className='form-tile'>Sign Up & Personalize</h1>

      <form action="" onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          validation={{required: "Full Name is required", minLength: 2}}
        />

        <InputField
          name="email"
          label="Email"
          placeholder="contact@404ryan.com"
          register={register}
          error={errors.email}
          validation={{required: "Email Name is required", pattern: /^\w+@\w+\.\w+$/, message: "Email Address is required"}}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type='password'
          register={register}
          error={errors.password}
          validation={{required: "Password is required", minLength: 9}}
        />

        <CountrySelectField
          name='country'
          label='Country'
          control={control}
          error={errors.country}
          required
        />

        <SelectField
          name='investmentGoals'
          label='Investment Goals'
          placeholder='Select your investment goal'
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        <SelectField
          name='riskTolerance'
          label='Risk Tolerance'
          placeholder='Select your risk level'
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />

        <SelectField
          name='preferredIndustry'
          label='Preferred Industry'
          placeholder='Select your preferred industry'
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

       <Button 
          type='submit' 
          disabled={isSubmitting} 
          className='yellow-btn w-full mt-5'
        >
          {isSubmitting ? "Creating Account..." : "Start Your Investing Journey"}
        </Button>

        <FooterLink text='Already have an account' linkText='Sign in' href='/sign-in'/>
      </form>

    </div>
  )
}

export default SignUpPage
