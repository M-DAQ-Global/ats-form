export default function ApplicationSuccess() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-2xl mx-auto px-8 py-16">
                <div className="flex justify-center mb-12">
                    <img src="/m-daqlogo2.png" alt="mDAQ" className="h-10 w-auto" />
                </div>

                <div className="flex flex-col items-center gap-4 py-16 text-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Application Submitted</h1>
                    <p className="text-sm text-gray-500 max-w-sm">
                        Thank you for applying. We've received your application and will be in touch if there's a match.
                    </p>
                </div>
            </div>
        </div>
    )
}
