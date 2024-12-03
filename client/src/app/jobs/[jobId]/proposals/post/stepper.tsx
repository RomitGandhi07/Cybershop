// components/Stepper.tsx
import { BorderButton, PrimaryButton } from '@/shared/components/button';
import React, { useState, ReactElement, useRef } from 'react';

interface Step {
    component: ReactElement,
    name: string,
    nextButtonName?: string | null
}

interface StepperProps {
    steps: Step[],
    displayHeaderNavigation?: boolean,
    displayHeaderTitle?: boolean,
    title: string
}

const Stepper: React.FC<StepperProps> = ({
    steps,
    displayHeaderNavigation = false,
    displayHeaderTitle = false,
    title
}) => {
    const [currentStep, setCurrentStep] = useState(0);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const stepRefs = steps.map(() => useRef<{ onNext: () => Promise<boolean> }>(null));


    const goToNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const nextStep = async () => {
        // Fetch the current ref
        const currentRef = stepRefs[currentStep].current;

        // Call the onNext function of the current step component if it exists
        if (currentRef?.onNext) {
            const response = await currentRef.onNext();

            if(response) {
                goToNextStep();
            }
        }
        else {
            goToNextStep();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Stepper Navigation */}
            {displayHeaderNavigation && <div className="flex space-x-4 mb-4">
                {steps.map((_, index) => (
                    <div
                        key={index}
                        className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${index === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => setCurrentStep(index)}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>}

            {/* Step Component */}
            <div className="p-4 w-full h-full max-w-6xl mt-20">
                {
                    displayHeaderTitle &&
                    <div className="text-gray-600 text-sm font-medium space-x-1">
                        <span>{currentStep + 1}/{steps.length}</span>
                        <span className="text-gray-400">{title}</span>
                    </div>
                }
                {/* {steps[currentStep].component} */}
                {React.cloneElement(steps[currentStep].component, {
                    ref: stepRefs[currentStep], // Pass the ref to each child component
                })}
            </div>

            {/* Navigation Buttons */}
            <div className="w-[80%] flex flex-row justify-center fixed bottom-0 mb-4">

                {/* <div className="border-t-2 border-gray-800 mb-4"></div> */}

                {/* <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                // hidden={currentStep === 0}
                >
                    Previous
                </button> */}
                <BorderButton
                    isLoader={false}
                    onClick={prevStep}
                    className="px-4 py-2 block max-w-[30%]"
                    mergeClasses={true}
                >
                    Previous
                </BorderButton>
                {/* <button
                    onClick={nextStep}
                    // disabled={currentStep === steps.length - 1}
                    className="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50"
                >
                    {
                        steps[currentStep].nextButtonName ?? `Next: ${steps[currentStep + 1].name}`
                    }
                </button> */}
                <PrimaryButton
                    isLoader={false}
                    onClick={nextStep}
                    className="ml-10 px-4 py-2 block max-w-[30%]"
                // mergeClasses={true}
                >
                    {steps[currentStep].nextButtonName ?? `Next: ${steps[currentStep + 1].name}`}
                </PrimaryButton>
            </div>
        </div>
    );
};

export default Stepper;
