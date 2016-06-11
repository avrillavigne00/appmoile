package com.yonyou.cpu.cdn;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AllowOriginFilter implements Filter {

	public void init(FilterConfig filterConfig) throws ServletException {

	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletResponse _response = (HttpServletResponse)response;
		_response.addHeader("Access-Control-Allow-Origin","*");
		chain.doFilter(request, _response);
	}

	public void destroy() {

	}

}
