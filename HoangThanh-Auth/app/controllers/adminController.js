const User = require('../modulers/user')
const Ticket = require("../modulers/ticket")
const bcrypt = require("bcrypt")

class adminController {
    signIn(req, res) {
        res.render('admin/signIn');
    }
    async login(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user || !user.admin) {
                return res.render('admin/signIn', { error: 'Tài khoản không tồn tại' });
            } else {
                const validPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (validPassword) {
                    res.cookie("uid", user.id);
                    res.statusCode = 302;
                    res.setHeader('Location', '/admin/products');
                    res.end();
                } else {
                    return res.render('admin/signIn', { error: 'Mật khẩu không chính xác' });
                }
            }
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await User.find();
            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const { userId } = req.params;
            const { username, email, phone } = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { username, email, phone },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ error: 'Người dùng không tồn tại' });
            }

            return res.status(200).json({
                message: 'Cập nhật thông tin người dùng thành công',
                user: updatedUser
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { userId } = req.params;

            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) {
                return res.status(404).json({ error: 'Người dùng không tồn tại' });
            }

            return res.status(200).json({ message: 'Xóa người dùng thành công' });
        } catch (error) {
            next(error);
        }
    }


}

module.exports = new adminController()