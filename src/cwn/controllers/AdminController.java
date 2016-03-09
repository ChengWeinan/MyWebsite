package cwn.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import cwn.beans.AdminBean;


@Controller
public class AdminController {
	private static final String ADMINPASSWORD = "";
	/**
	 * 判断登录信息
	 * */
	@RequestMapping(
		value="/GetAdminSignInOp",
		method=RequestMethod.POST,
		produces={"application/xml", "application/json"}
	)
	@ResponseBody
	public List getAdminSignIn(@RequestBody AdminBean adminBean) {
		List<Boolean> compareResult = new ArrayList<Boolean>();
		compareResult.add(0 == adminBean.getPassword().compareTo(ADMINPASSWORD));
		return compareResult;
	}

}
