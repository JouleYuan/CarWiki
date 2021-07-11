package cn.edu.zju.carwiki.entity;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

/**
 * @author jouleyuan
 * @date 2021/7/10 16:32
 */
@Data
public class ResponseData {
    private final String message;
    private final int code;
    private final Map<String, Object> data;

    private ResponseData(int code, String message) {
        this.code = code;
        this.message = message;
        this.data = new HashMap<>();
    }

    private ResponseData(int code, String message, Map<String, Object> data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    private ResponseData(int code, String message, String errorMessage) {
        this.code = code;
        this.message = message;
        this.data = new HashMap<>();
        this.data.put("error", errorMessage);
    }

    public static ResponseData ok(Map<String, Object> data) {
        return new ResponseData(200, "Ok", data);
    }

    public static ResponseData notFound() {
        return new ResponseData(404, "Not Found");
    }

    public static ResponseData badRequest(String errorMessage) {
        return new ResponseData(400, "Bad Request", errorMessage);
    }

    public static ResponseData forbidden() {
        return new ResponseData(403, "Forbidden");
    }

    public static ResponseData unauthorized() {
        return new ResponseData(401, "Unauthorized");
    }

    public static ResponseData serverInternalError() {
        return new ResponseData(500, "Server Internal Error");
    }

    public static ResponseData customerError() {
        return new ResponseData(250, "Customer Error");
    }
}
