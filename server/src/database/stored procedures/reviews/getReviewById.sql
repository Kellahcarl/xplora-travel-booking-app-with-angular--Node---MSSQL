CREATE or alter PROCEDURE GetReviewDetails
    @reviewId varchar(100)
AS
BEGIN
    SELECT
        r.review_id,
        r.user_id,
        r.tour_id,
        r.review_content,
        r.review_rating,
        r.review_date,
        u.fullName as userFullName,
        u.email as userEmail,
        u.imageUrl as userImageUrl,
        t.tour_name,
        t.tour_description,
        t.tour_img,
        t.price,
        t.start_date as tour_start_date,
        t.end_date as tour_end_date
    FROM
        reviews r
    INNER JOIN
        users u ON r.user_id = u._id
    INNER JOIN
        tours t ON r.tour_id = t.tour_id
    WHERE
        r.review_id = @reviewId
        AND r.isDeleted = 0; -- Exclude deleted reviews if any
END;
