import React from 'react';

type StarRatingProps = {
    rating: number; // Rating value (e.g., 4)
    maxRating?: number; // Optional max rating, defaults to 5
    noOfReviews?: number | null
};

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5,noOfReviews = null }) => {
    const filledStars = Math.min(rating, maxRating); // Limit filled stars to maxRating
    const emptyStars = maxRating - filledStars; // Calculate remaining empty stars

    return (
        <div className="flex items-center">
            {/* Filled Stars */}
            {[...Array(filledStars)].map((_, index) => (
                <svg
                    key={`filled-${index}`}
                    className="ml-1 w-4 h-4 text-orange-600 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            ))}

            {/* Empty Stars */}
            {[...Array(emptyStars)].map((_, index) => (
                <svg
                    key={`empty-${index}`}
                    className="ml-1 w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            ))}

            <div className='ml-2 flex'>
                {/* Display Rating Text */}
                {/* <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{rating} &nbsp;</p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of &nbsp;</p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{maxRating}  &nbsp;</p> */}
                {noOfReviews && <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">({noOfReviews} {noOfReviews === 1 ? "Review" : "Reviews"})  &nbsp;</p>}
            </div>

        </div>
    );
};

export default StarRating;
