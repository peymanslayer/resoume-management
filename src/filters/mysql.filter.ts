import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
  } from '@nestjs/common';
  import { QueryFailedError , TypeORMError} from 'typeorm';
  
  @Catch(QueryFailedError)
  export class MysqlExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      // پیش‌فرض‌ها
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR; // کد وضعیت HTTP پیش‌فرض
      let message = 'Internal server error'; // پیام خطای پیش‌فرض
  
      // بررسی کد خطای MySQL
      if (exception.name) {
        const errorCode = exception.driverError.code;
        console.log(errorCode);
        
  
        switch (errorCode) {
          case 'ER_DUP_ENTRY': // ورود تکراری
            statusCode = HttpStatus.CONFLICT;
            message = 'Duplicate entry. Please use unique values.';
            break;
  
          case 'ER_NO_REFERENCED_ROW_2': // کلید خارجی نامعتبر
            statusCode = HttpStatus.BAD_REQUEST;
            message = 'Invalid foreign key reference.';
            break;
  
          case 'ER_ROW_IS_REFERENCED_2': // حذف رکوردی که ارجاع شده است
            statusCode = HttpStatus.BAD_REQUEST;
            message = 'Cannot delete or update a record that is referenced by another record.';
            break;
  
          case 'ER_BAD_NULL_ERROR': // مقدار NULL در ستون غیرقابل NULL
            statusCode = HttpStatus.BAD_REQUEST;
            message = 'A required field cannot be null.';
            break;
  
          case 'ER_PARSE_ERROR': // خطای نحوی
            statusCode = HttpStatus.BAD_REQUEST;
            message = 'There is a syntax error in your SQL query.';
            break;
  
          case 'ER_DATA_TOO_LONG': // مقدار بیش از حد طولانی
            statusCode = HttpStatus.BAD_REQUEST;
            message = 'Data too long for column. Please check the length of your input.';
            break;
  
          case 'ER_TRUNCATED_WRONG_VALUE': // مقدار ناسازگار با نوع داده
            statusCode = HttpStatus.BAD_REQUEST;
            message = 'Invalid value for column. Please check the data type.';
            break;
  
          case 'ER_LOCK_WAIT_TIMEOUT': // زمان انتظار برای قفل تمام شده است
            statusCode = HttpStatus.REQUEST_TIMEOUT;
            message = 'Database lock wait timeout exceeded. Please try again later.';
            break;
  
          case 'ER_LOCK_DEADLOCK': // بن‌بست
            statusCode = HttpStatus.CONFLICT;
            message = 'A database deadlock occurred. Please try again.';
            break;
  
          case 'ER_NO_SUCH_TABLE': // جدول وجود ندارد
            statusCode = HttpStatus.NOT_FOUND;
            message = 'The requested table does not exist in the database.';
            break;
  
          case 'ER_BAD_FIELD_ERROR': // ستون وجود ندارد
            statusCode = HttpStatus.BAD_REQUEST;
            message = 'The requested column does not exist in the database.';
            break;
  
          case 'ER_UNKNOWN_ERROR': // خطای ناشناخته
          default:
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'An unknown database error occurred.';
            break;
          case'ER_WARN_DATA_OUT_OF_RANGE':
          statusCode=HttpStatus.BAD_REQUEST;
          message='data out of range'
        }
      }
  
      // ارسال پاسخ به کاربر
      response.status(statusCode).json({
        statusCode,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }