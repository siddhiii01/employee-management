export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
        const errors = JSON.parse(result.error.message);
        return res.status(400).json({ 
            error: errors[0].message 
        });
    }
    
    req.validatedData = result.data;
    next();
};