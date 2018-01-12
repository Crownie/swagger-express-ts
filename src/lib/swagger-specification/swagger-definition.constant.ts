export class SwaggerDefinitionConstant {
    private static JSON: string = "application/json";
    private static XML: string = "application/xml";
    public static Produce = {
        XML : SwaggerDefinitionConstant.XML,
        JSON : SwaggerDefinitionConstant.JSON
    };

    public static Scheme = {
        HTTP : "http",
        HTTPS : "https"
    };

    public static Consume = {
        XML : SwaggerDefinitionConstant.XML,
        JSON : SwaggerDefinitionConstant.JSON
    }

    public static Definition = {
        Type : {
            OBJECT : "object"
        },
        Property : {
            Type : {
                INTEGER : "integer",
                STRING : "string"
            },
            Format: {
                INT_64: "int64"
            }
        }
    }
}