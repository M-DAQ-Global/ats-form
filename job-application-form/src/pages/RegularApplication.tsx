import { useSearchParams, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import countries from '@/assets/countries.json'

interface IFormInput {
    name: string
    email: string
    location: string
    sponsorship: string
    phone_number?: string

    expected_salary: number
    notice_period: string
    availability: string
    resume: FileList
}

export default function RegularApplication() {
    const [searchParams] = useSearchParams()
    const slug = [...searchParams.keys()].find(key => searchParams.get(key) === '')
    const job = searchParams.get('jobname')
    const jobLocation = searchParams.get('job-location')
    const department = searchParams.get('job-department')
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const baseUrl = import.meta.env.VITE_APPLICATION_ENDPOINT_URL
        const formData = new FormData()

        formData.append('slug', slug ?? '')
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('location', data.location)
        formData.append('sponsorship', data.sponsorship)
        if (data.phone_number) formData.append('phone_number', data.phone_number)
        formData.append('expected_salary', String(data.expected_salary))
        formData.append('notice_period', data.notice_period)
        formData.append('availability', data.availability)
        formData.append('resume', data.resume[0])

        await fetch(`${baseUrl}/api/apply`, {
            method: 'POST',
            body: formData,
        })

        navigate(`/application/success?slug=${slug}`)
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-2xl mx-auto px-8 py-16">
                <div className="flex justify-center mb-12">
                    <img src="/m-daqlogo2.png" alt="mDAQ" className="h-10 w-auto" />
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {job ?? 'Job Application'}
                </h1>

                {(jobLocation || department) && (
                    <div className="flex gap-4 mb-10 text-sm text-gray-500">
                        {jobLocation && <span>{jobLocation}</span>}
                        {jobLocation && department && <span>·</span>}
                        {department && <span>{department}</span>}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                    {/* Personal Information */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                            Personal Information
                        </h3>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-900">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                placeholder="Jane Doe"
                                aria-invalid={!!errors.name}
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-900">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="email"
                                placeholder="jane@example.com"
                                aria-invalid={!!errors.email}
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Enter a valid email address',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-900">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="border border-gray-300 flex h-9 w-full rounded-md bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-invalid={!!errors.location}
                                {...register('location', { required: 'Country is required' })}
                            >
                                <option value="">Select your country</option>
                                {countries.map((country) => (
                                    <option key={country.code} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            {errors.location && (
                                <p className="text-xs text-red-500">{errors.location.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-900">
                                Work Visa Sponsorship <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-500">
                                Would you now, or in the future, require work visa sponsorship to work in the country you're applying to?
                            </p>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('sponsorship', { required: 'Please select an option' })}
                                    />
                                    No
                                </label>
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="radio"
                                        value="yes"
                                        {...register('sponsorship', { required: 'Please select an option' })}
                                    />
                                    Yes
                                </label>
                            </div>
                            {errors.sponsorship && (
                                <p className="text-xs text-red-500">{errors.sponsorship.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-900">
                                Phone Number <span className="text-gray-400 text-xs font-normal">(optional)</span>
                            </label>
                            <Input
                                type="tel"
                                placeholder="+1 234 567 8900"
                                {...register('phone_number')}
                            />
                        </div>
                    </div>

                    {/* Employment Details */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                            Employment Details
                        </h3>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-900">
                                Expected Annual Salary (USD) <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="number"
                                min={0}
                                placeholder="80000"
                                aria-invalid={!!errors.expected_salary}
                                {...register('expected_salary', {
                                    required: 'Expected salary is required',
                                    min: { value: 0, message: 'Salary must be a positive number' },
                                    valueAsNumber: true,
                                })}
                            />
                            {errors.expected_salary && (
                                <p className="text-xs text-red-500">{errors.expected_salary.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-900">
                                Notice Period <span className="text-red-500">*</span>
                            </label>
                            <Input
                                placeholder="e.g. 1 month, 2 weeks, Immediately"
                                aria-invalid={!!errors.notice_period}
                                {...register('notice_period', { required: 'Notice period is required' })}
                            />
                            <p className="text-xs text-gray-400">e.g. Immediately, 2 weeks, 1 month, 3 months</p>
                            {errors.notice_period && (
                                <p className="text-xs text-red-500">{errors.notice_period.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-900">
                                Availability to Start <span className="text-red-500">*</span>
                            </label>
                            <Input
                                placeholder="e.g. 1 March 2025, Within 2 weeks"
                                aria-invalid={!!errors.availability}
                                {...register('availability', { required: 'Availability is required' })}
                            />
                            <p className="text-xs text-gray-400">e.g. Immediately, 1 March 2025, Within 2 weeks</p>
                            {errors.availability && (
                                <p className="text-xs text-red-500">{errors.availability.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-900">
                                Resume <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="file"
                                accept=".pdf"
                                aria-invalid={!!errors.resume}
                                {...register('resume', {
                                    required: 'Resume is required',
                                    validate: (files) => {
                                        if (files?.[0]?.type !== 'application/pdf') return 'Only PDF files are accepted'
                                        if (files[0].size > 5 * 1024 * 1024) return 'File size must be under 5 MB'
                                        return true
                                    },
                                })}
                            />
                            <p className="text-xs text-gray-400">PDF only, max 5 MB</p>
                            {errors.resume && (
                                <p className="text-xs text-red-500">{errors.resume.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-2 rounded-full h-auto"
                        >
                            Submit Application
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
