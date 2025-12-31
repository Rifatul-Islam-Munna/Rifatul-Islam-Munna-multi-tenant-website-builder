public static class BooleanHelper
{

    public static bool ToBool(object? input)
    {
        if (input == null) return false;

        var str = input.ToString()?.Trim().ToLower();
        return str == "true";
    }
}
